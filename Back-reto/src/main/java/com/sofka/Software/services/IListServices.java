package com.sofka.Software.services;

import com.sofka.Software.models.ListModel;

public interface IListServices {
    Iterable<ListModel> list();
    ListModel createList(ListModel lista);
    void deleteTask(Long id);
    ListModel get(Long id);
}
