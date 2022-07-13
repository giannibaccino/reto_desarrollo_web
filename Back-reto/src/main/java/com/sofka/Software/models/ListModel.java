package com.sofka.Software.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@Table(name = "lista")
public class ListModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.EAGER,
            targetEntity = ListTaskModel.class,
            cascade = CascadeType.REMOVE,
            mappedBy = "listaid")
    @JsonBackReference
    private List<ListTaskModel>ListTask = new ArrayList<>();
}
