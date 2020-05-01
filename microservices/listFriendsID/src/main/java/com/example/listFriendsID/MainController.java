package com.example.listFriendsID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping(path="/Twitter")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FriendRipository friendRipository;

    @GetMapping(path="/listFriendsID") // Map ONLY POST Requests
    public @ResponseBody String listFriendsID (@RequestParam String idUser) {

        JSONObject rep = new JSONObject();
        List<JSONObject> friendsJson = new ArrayList<>();
        try {
            // récuperer les clé des amis de idUser
            Iterable<Friend> friends = friendRipository.findAll();
            List<Integer> idFriends = new ArrayList<>();
            for (Friend f : friends) {
                System.out.println(f);
                if (f.getIdUser().equals(Integer.parseInt(idUser))) {
                    idFriends.add(f.getIdFriend());
                }
            }

            for (Integer id: idFriends){
                User user = userRepository.findById(id).get();
                JSONObject jsonUser = new JSONObject();
                jsonUser.put("id", id);
                jsonUser.put("nom", user.getNom());
                jsonUser.put("prenom", user.getPrenom());
                friendsJson.add(jsonUser);
            }
            if (friendsJson.size() == 0){
                rep.put("code", 3);
                rep.put("msg", "liste d'amis vides");
                return rep.toString();
            }

            rep.put("amis", friendsJson);
            rep.put("code", -1);
            return rep.toString();
        }catch (Exception e){
            rep.put("code", 1000);
            rep.put("msg", "SQL PROBLEME {listeFriendID}");
            return  rep.toString();
        }
    }

}