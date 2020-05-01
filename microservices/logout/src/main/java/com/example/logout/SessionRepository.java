package com.example.logout;

import org.springframework.data.jpa.repository.JpaRepository;


public interface SessionRepository extends JpaRepository<Session, Integer> {

}