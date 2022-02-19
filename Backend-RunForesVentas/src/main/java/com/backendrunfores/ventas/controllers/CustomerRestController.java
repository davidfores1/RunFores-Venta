package com.backendrunfores.ventas.controllers;

import com.backendrunfores.ventas.models.entity.Customer;
import com.backendrunfores.ventas.models.services.ICustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200/"})
@RestController
@RequestMapping("/api")
public class CustomerRestController {

    @Autowired
    ICustomerService customerService;

    private final Logger log = LoggerFactory.getLogger(CustomerRestController.class);

    @GetMapping("/clientes")
    public List<Customer> index() {
        return customerService.findAll();
    }

    @GetMapping("/clientes/page/{page}")
    public Page<Customer> index(@PathVariable Integer page) {

        return customerService.findAll(PageRequest.of(page, 4));
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<?> searchId(@PathVariable Long id) {

        Customer customer = null;
        Map<String, Object> response = new HashMap<>();

        try {

            customer = customerService.findById(id);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (customer == null) {

            response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Customer>(customer, HttpStatus.OK);

    }

    @PostMapping("clientes")
    public ResponseEntity<?> create(@Valid @RequestBody Customer customer, BindingResult result) {

        Customer byDocument = (Customer) customerService.byDocument(customer.getDocument());

        Customer newCustomer = null;


        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {

            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("error", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (byDocument != null) {

            response.put("mensaje", "El número de documento ya existe");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        try {

            newCustomer = customerService.save(customer);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El cliente ha sido creado con éxito");
        response.put("customer", newCustomer);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PutMapping("clientes/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Customer customer, BindingResult result, @PathVariable Long id) {

        Customer actualCustomer = customerService.findById(id);
        Customer updateCustomer = null;

        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {

            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("error", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (actualCustomer == null) {

            response.put("mensaje", "Error: no se puede editar, el cliente ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        try {
            actualCustomer.setDocument(customer.getDocument());
            actualCustomer.setName(customer.getName());
            actualCustomer.setPhone(customer.getPhone());
            actualCustomer.setEmail(customer.getEmail());
            actualCustomer.setDateBirth(customer.getDateBirth());

            updateCustomer = customerService.save(actualCustomer);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar al actualizar el cliente en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido actualizado con éxito");
        response.put("customer", updateCustomer);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();

        try {

            Customer customer = customerService.findById(id);
            String previousPhotoName = customer.getPhoto();

            if(previousPhotoName != null && previousPhotoName.length()>0){
                Path previousRoutePhoto = Paths.get("uploads").resolve(previousPhotoName).toAbsolutePath();
                File previousFilePhoto = previousRoutePhoto.toFile();

                if(previousFilePhoto.exists() && previousFilePhoto.canRead()){
                    previousFilePhoto.delete();
                }
            }

            customerService.delete(id);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente eliminado con éxito");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

    @PostMapping("/clientes/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        Customer customer = customerService.findById(id);

        if (!file.isEmpty()){
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", " ");
            Path routeFile = Paths.get("uploads").resolve(fileName).toAbsolutePath();

            log.info(routeFile.toString());
            try {
                Files.copy(file.getInputStream(), routeFile);
            } catch (IOException e) {

                response.put("mensaje", "Error al subir la imagen del cliente");
                response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String previousPhotoName = customer.getPhoto();

            if(previousPhotoName != null && previousPhotoName.length()>0){
                Path previousRoutePhoto = Paths.get("uploads").resolve(previousPhotoName).toAbsolutePath();
                File previousFilePhoto = previousRoutePhoto.toFile();

                if(previousFilePhoto.exists() && previousFilePhoto.canRead()){
                    previousFilePhoto.delete();
                }
            }

            customer.setPhoto(fileName);
            customerService.save(customer);

            response.put("customer", customer);
            response.put("mensaje", "Has subido correctamente la imagen: " + fileName);
        }

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/uploads/img/{phoneName:.+}")
    public ResponseEntity<Resource>seePhoto(@PathVariable String phoneName){

        Path routeFile = Paths.get("uploads").resolve(phoneName).toAbsolutePath();
        log.info(routeFile.toString());
        Resource resource = null;

        try {
            resource = new UrlResource(routeFile.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        if (!resource.exists() && !resource.isReadable()){
        	routeFile = Paths.get("src/main/resources/static/images").resolve("not_user.png").toAbsolutePath();
        	try {
                resource = new UrlResource(routeFile.toUri());
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
            log.error("Error, no se pudo cargar la imagen: " + phoneName);
        }

        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");

        return new ResponseEntity<Resource>(resource,cabecera, HttpStatus.CREATED);
    }

}
