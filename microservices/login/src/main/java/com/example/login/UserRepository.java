package com.example.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.login.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}