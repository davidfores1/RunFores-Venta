package com.backendrunfores.ventas.models.entity;


import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "customers")
public class Customer implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(min = 8, max = 10)
    @Column(nullable = false, unique = true)
    private String document;

    @NotEmpty
    @Size(min = 7, max = 40)
    @Column(nullable = false)
    private String name;

    @Size(min = 7, max = 10)
    @Column(nullable = true)
    private String phone;

    @Email
    @Column(nullable = true)
    private String email;


    @Column(name = "date_birth")
    @Temporal(TemporalType.DATE)
    private Date dateBirth;

    private String photo;

    @Column(name = "create_at")
    private LocalDateTime createAt;
    @Column(name = "update_at")
    private LocalDateTime updateAt;
    
    @NotNull(message="La región no pude ser vacia")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Region region;

    public Long getId() {

        return id;

    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public Date getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(Date dateBirth) {

        this.dateBirth = dateBirth;
    }

    public String getPhoto() {
        return photo;
    }


    public void setPhoto(String photo) {
        this.photo = photo;
    }

    @PrePersist
    private void antesDePersistir() {
        this.createAt = LocalDateTime.now();
    }

    @PreUpdate
    private void antesDeUpdate() {

        this.updateAt = LocalDateTime.now();
    }

	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}
    
    
}
