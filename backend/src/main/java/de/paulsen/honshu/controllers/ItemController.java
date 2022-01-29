package de.paulsen.honshu.controllers;

import de.paulsen.honshu.entities.Item;
import de.paulsen.honshu.services.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ItemController {
	private final ItemService is;

	public ItemController(ItemService is) { this.is = is; }

	@GetMapping("/tasks")
	public ResponseEntity<List<Item>> getAllItems() {
		try {
			var items = is.listItems();
			if (items.isEmpty()) return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);

			return new ResponseEntity<>(items, HttpStatus.OK);

		} catch (Exception ex) {
			System.err.println(ex.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/tasks")
	public ResponseEntity<Item> addNewItem(@RequestBody final Item task) {
		try {
			var _task = is.addNewItem(task.getTask(), task.isCompleted());
			return new ResponseEntity<>(_task, HttpStatus.CREATED);
		} catch (Exception ex) {
			System.err.println(ex.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/tasks/{id}")
	public ResponseEntity<HttpStatus> deleteItem(@PathVariable("id") final String id) {
		try {
			is.deleteItem(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception ex) {
			System.err.println(ex.getMessage());
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@DeleteMapping("/tasks")
	public ResponseEntity<HttpStatus> deleteAllItems() {
		try {
			is.deleteAllItems();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/tasks/{id}")
	public ResponseEntity<Item> updateItem(@PathVariable("id") String id, @RequestBody Item item) {
		var taskData = is.findById(id);
		return taskData != null ? new ResponseEntity<>(is.updateItem(id, item), HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
