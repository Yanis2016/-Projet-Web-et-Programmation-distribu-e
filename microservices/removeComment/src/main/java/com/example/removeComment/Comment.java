package com.example.removeComment;

import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

// Commentaire
public class Comment {
    @MongoId
    private String id;
    private String idUser;
    private String nom;
    private String prenom;
    private String text;
    private Timestamp date = new Timestamp(Calendar.getInstance().getTimeInMillis());
    private List<Comment> reply = new ArrayList<>();
    private List<String> likes = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public List<Comment> getReply() {
        return reply;
    }

    public void setReply(List<Comment> reply) {
        this.reply = reply;
    }

    public List<String> getLike() {
        return likes;
    }

    public void setLike(List<String> like) {
        this.likes = likes;
    }

    public void addLike(String id){
        likes.add(id);
    }

    public void removeLike(String id){
        likes.remove(id);
    }

    public void addReply(Comment comment){
        reply.add(comment);
    }

    public boolean removeReply(Comment comment){
        return reply.remove(comment);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id='" + id + '\'' +
                ", idUser='" + idUser + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", text='" + text + '\'' +
                ", date='" + date + '\'' +
                ", reply=" + reply +
                ", like=" + likes +
                '}';
    }
}
