package com.backendrunfores.ventas.models.services;

import com.backendrunfores.ventas.models.entity.Customer;

import java.util.List;

public interface ICustomerService {

    public List<Customer> findAll();
}
