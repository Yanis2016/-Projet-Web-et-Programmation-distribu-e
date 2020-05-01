package com.example.createUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.createUser.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}