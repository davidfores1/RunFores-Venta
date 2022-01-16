package com.backendrunfores.ventas.models.dao;

import com.backendrunfores.ventas.models.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerDao extends JpaRepository<Customer, Long> {


}
