package com.backendrunfores.ventas.models.dao;

import com.backendrunfores.ventas.models.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICustomerDao extends JpaRepository<Customer, Long> {

    @Query("select c from Customer c where c.document = ?1")
    public Customer findByDocument(String document);

}
