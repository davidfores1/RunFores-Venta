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
    ICustomerService customerService;

    @GetMapping("/clientes")
    public List<Customer> index() {
        return customerService.findAll();
    }

    @PostMapping("clientes")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer create(@RequestBody Customer customer) {

        return customerService.save(customer);
    }

    @PutMapping("clientes/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer update(@RequestBody Customer customer, @PathVariable Long id) {

        Customer updateCustomer = customerService.findById(id);

        updateCustomer.setDocument(customer.getDocument());
        updateCustomer.setName(customer.getName());
        updateCustomer.setPhone(customer.getPhone());
        updateCustomer.setEmail(customer.getEmail());

        return customerService.save(updateCustomer);
    }

    @DeleteMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        customerService.delete(id);
    }

}
