package de.paulsen.honshu.controllers;

import de.paulsen.honshu.entities.Item;
import de.paulsen.honshu.services.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
