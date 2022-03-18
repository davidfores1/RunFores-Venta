package com.backendrunfores.ventas.models.dao;

import com.backendrunfores.ventas.models.entity.Customer;
import com.backendrunfores.ventas.models.entity.Region;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ICustomerDao extends JpaRepository<Customer, Long> {

    @Query("select c from Customer c where c.document = ?1")
    public Customer findByDocument(String document);
    
    @Query("from Region")
    public List<Region> findAllRegions();
    

}
