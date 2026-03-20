package com.labareda.api.domain.repository;

import com.labareda.api.domain.model.Client;
import com.labareda.api.domain.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByNameIgnoreCase(String name);
    List<Company> findByNameContainingIgnoreCase(String name);


}
