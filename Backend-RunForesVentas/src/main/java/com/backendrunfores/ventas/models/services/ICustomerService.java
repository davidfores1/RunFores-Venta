package com.backendrunfores.ventas.models.services;

import com.backendrunfores.ventas.models.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICustomerService {

    public List<Customer> findAll();

    public Page<Customer> findAll(Pageable pageable);

    public Customer findById(Long id);

    public Customer save(Customer customer);

    public void delete(Long id);

}
