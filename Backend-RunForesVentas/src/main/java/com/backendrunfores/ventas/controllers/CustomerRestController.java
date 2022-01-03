package com.backendrunfores.ventas.controllers;

import com.backendrunfores.ventas.models.entity.Customer;
import com.backendrunfores.ventas.models.services.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
