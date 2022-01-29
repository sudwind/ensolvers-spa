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

	public Item findById(String id) {
		return itemRep.findById(id).orElse(null);
	}

	public Item addNewItem(String title, boolean isCompleted) {
		return itemRep.save(new Item(title, isCompleted));
	}

	public void deleteItem(String id) {
		itemRep.deleteById(id);
	}

	public void deleteAllItems() {
		itemRep.deleteAll();
	}

	public Item updateItem(String id, Item item) {
		var taskData = itemRep.findById(id);

		if(taskData.isPresent()) {
			var _item = taskData.get();
			_item.setTask(item.getTask());
			_item.setCompleted(item.isCompleted());
			return itemRep.save(_item);
		} else {
			return null;
		}
	}
}
