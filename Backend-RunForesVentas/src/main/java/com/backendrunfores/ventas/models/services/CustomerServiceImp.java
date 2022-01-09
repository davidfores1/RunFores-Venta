package com.backendrunfores.ventas.models.services;

import com.backendrunfores.ventas.models.dao.ICustomerDao;
import com.backendrunfores.ventas.models.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerServiceImp implements ICustomerService {

    @Autowired
    ICustomerDao customerDao;

    @Override
    @Transactional(readOnly = true)
    public List<Customer> findAll() {
        return (List<Customer>) customerDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Customer findById(Long id) {
        return customerDao.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Customer save(Customer customer) {
        return customerDao.save(customer);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        customerDao.deleteById(id);
    }
}
