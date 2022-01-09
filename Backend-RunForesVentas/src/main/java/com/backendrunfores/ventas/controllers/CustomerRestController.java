package com.backendrunfores.ventas.controllers;

import com.backendrunfores.ventas.models.entity.Customer;
import com.backendrunfores.ventas.models.services.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200/"})
@RestController
@RequestMapping("/api")
public class CustomerRestController {

    @Autowired
    private ICustomerService customerService;

    @GetMapping("/clientes")
    public List<Customer>index(){
        return customerService.findAll();
    }

    @GetMapping("/clientes/{id}")
    public Customer show(@PathVariable long id){
    return customerService.findById(id);
    }

    @PostMapping("/clientes")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer show(@RequestBody Customer customer){
        return customerService.save(customer);
    }

    @PutMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer update(@RequestBody Customer customer, @PathVariable Long id){

        Customer customerUpdate = customerService.findById(id);

        customerUpdate.setDocument(customerUpdate.getDocument());
        customerUpdate.setName(customerUpdate.getName());
        customerUpdate.setLastName(customerUpdate.getLastName());
        customerUpdate.setPhone(customerUpdate.getPhone());
        customerUpdate.setEmail(customerUpdate.getEmail());

        return  customerService.save(customer);

    }

    @DeleteMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){

        customerService.delete(id);

    }


}
