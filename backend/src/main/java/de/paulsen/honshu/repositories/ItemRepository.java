package de.paulsen.honshu.repositories;

import de.paulsen.honshu.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, String> {}
