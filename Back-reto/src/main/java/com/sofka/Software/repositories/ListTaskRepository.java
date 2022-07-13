package com.sofka.Software.repositories;

import com.sofka.Software.models.ListTaskModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListTaskRepository extends JpaRepository<ListTaskModel, Long> {
}
