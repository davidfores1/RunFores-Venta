package com.backendrunfores.ventas.models.dao;

import com.backendrunfores.ventas.models.entity.Customer;
import org.springframework.data.repository.CrudRepository;

public interface ICustomerDao extends CrudRepository <Customer, Long> {


}
