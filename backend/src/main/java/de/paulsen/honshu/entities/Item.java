package de.paulsen.honshu.entities;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class Item {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	private String taskText;
	private boolean isCompleted;

	public Item() {}

	public Item(String id, String taskText, boolean isCompleted) {
		this.id = id;
		this.taskText = taskText;
		this.isCompleted = isCompleted;
	}

	public Item(String taskText, boolean isCompleted) {
		this.taskText = taskText;
		this.isCompleted = isCompleted;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTaskText() {
		return taskText;
	}

	public void setTaskText(String taskText) {
		this.taskText = taskText;
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
				", task='" + taskText + '\'' +
				", isCompleted=" + isCompleted +
				'}';
	}
}
