package de.paulsen.honshu.services;

import de.paulsen.honshu.entities.Item;
import de.paulsen.honshu.repositories.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ItemService {
	private final ItemRepository itemRep;

	public ItemService(ItemRepository itemRep) { this.itemRep = itemRep; }

	public ArrayList<Item> listItems() {
		return (ArrayList<Item>) itemRep.findAll();
	}
}
