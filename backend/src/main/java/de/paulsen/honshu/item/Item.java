package de.paulsen.honshu.item;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Item {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	private String task;
	private boolean isCompleted;

	public Item() {}

	public Item(String id, String task, boolean isCompleted) {
		this.id = id;
		this.task = task;
		this.isCompleted = isCompleted;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public boolean isCompleted() {
		return isCompleted;
	}

	public void setCompleted(boolean completed) {
		isCompleted = completed;
	}

	@Override
	public String toString() {
		return "Item{" +
				"id='" + id + '\'' +
				", task='" + task + '\'' +
				", isCompleted=" + isCompleted +
				'}';
	}
}
