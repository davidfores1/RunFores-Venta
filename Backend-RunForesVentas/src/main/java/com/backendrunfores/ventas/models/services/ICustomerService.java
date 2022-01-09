package com.backendrunfores.ventas.models.services;

import com.backendrunfores.ventas.models.entity.Customer;

import java.util.List;

public interface ICustomerService {

    public List<Customer> findAll();

    public Customer findById(Long id);

    public Customer save(Customer customer);

    public void delete(Long id);

}
