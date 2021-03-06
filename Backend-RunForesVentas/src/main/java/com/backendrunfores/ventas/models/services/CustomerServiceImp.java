package com.backendrunfores.ventas.models.services;

import com.backendrunfores.ventas.models.dao.ICustomerDao;
import com.backendrunfores.ventas.models.entity.Customer;
import com.backendrunfores.ventas.models.entity.Region;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Customer> findAll(Pageable pageable) {
        return customerDao.findAll(pageable);
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

    @Override
    public Customer byDocument(String document) {
        return customerDao.findByDocument(document);
    }

	@Override
    @Transactional
	public List<Region> findAllRegions() {
		// TODO Auto-generated method stub
		return customerDao.findAllRegions();
	}
}
