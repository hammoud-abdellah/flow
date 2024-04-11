const mongoose = require("mongoose");
const request = require("supertest");
const app=require("../app/index");
const jwt = require('jsonwebtoken');
const User = require("../app/model/User");
const Group = require("../app/model/Group");

require("dotenv").config();

let createdUserId;
let globalToken;
let groupCreted;

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/gest-projet");
});

afterAll(async () => {
  if (createdUserId) {
    await User.findByIdAndDelete(createdUserId);
  }
  if(groupCreted){
    await Group.findByIdAndDelete(groupCreted._id)
  }
  await mongoose.connection.close();
    
});


describe('POST /users/register', () => {
  it('devrait créer un nouvel utilisateur avec succès et renvoyer un code d\'état 201', async () => {
    const userData = {
        name: 'eger',
        email: 'eger@gmail.com',
        password: 'motdepasse123'
    };

    const response = await request(app)
        .post('/users/register')
        .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
    createdUserId = response.body._id;
});

  it('devrait renvoyer un code d\'état 500 en cas d\'erreur lors de la création de l\'utilisateur', async () => {
    const invalidUserData = {
      name: 'Jane Doe'
    };

    const response = await request(app)
      .post('/users/register')
      .send(invalidUserData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBeTruthy();
  });
});


describe("GET /users/login" ,()=>{
    it('devrait retourner un message de connexion réussie avec un code d\'état 200 si les informations de connexion sont valides', async () => {
        const userData = {
            email: 'eger@gmail.com',
            password: 'motdepasse123'
        };
      
        const response = await request(app)
            .post('/users/login')
            .send(userData);
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Connexion réussie' });
        globalToken = response.header["set-cookie"][0].split(';')[0];
    });

    it('devrait retourner un message d\'erreur avec un code d\'état 404 si l\'utilisateur n\'est pas trouvé', async () => {
        const userData = {
          email: 'undifined@example.com',
          password: 'motdepasse'
        };
    
        const response = await request(app)
          .post('/users/login')
          .send(userData);
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Utilisateur non trouvé' });
    });

    it('devrait retourner un message d\'erreur avec un code d\'état 401 si le mot de passe est incorrect', async () => {
        const userData = {
          email: 'taha.belhaj@gmail.com',
          password: 'mauvaismotdepasse'
        };
    
        const response = await request(app)
          .post('/users/login')
          .send(userData);
    
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Mot de passe incorrect' });
    });
})



describe('User Routes', ()=>{
    it('devrait obtenir un utilisateur existant avec succès lorsque l\'utilisateur est authentifié', async () => {
        const response = await request(app)
          .get(`/users/${createdUserId}`)
          .set('Cookie', [`${globalToken}`]);
          
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });
})

describe("Group Routes",()=>{
  describe("POST /groups",()=>{
    it("devrait retourner un code d'état 201 avec un message de succès en cas de création de groupe réussie",async ()=>{
      const groupName="Test Group"

      const response=await request(app).post("/groups").set('Cookie', [`${globalToken}`])
        .send({name:groupName});

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message","Groupe créé avec succès.");
      expect(response.body.group).toHaveProperty("name", groupName);
      groupCreted=response.body.group
    })

    it("devrait retourner un code d'état 401 car l'utilisateur n'ext pas autorisé",async ()=>{
      const groupName="Test1 Group"

      const response=await request(app).post("/groups")
        .send({name:groupName});

      expect(response.status).toBe(401);

    })

    it("devrait retourner un code d'état 403 car l'utilisateur est authentifier mais non autorisé",async ()=>{
      const invalideToken="invalide_token";
      const groupName="Test3 Group"

      const response=await request(app).post("/groups")
        .set("Cookie", [`jwt=${invalideToken}`])
        .send({ name: groupName });
      
        expect(response.status).toBe(403);
    })

  })

  describe("POST /groups/:groupId/invite",()=>{
    it("devrait générer un lien d\'invitation avec succès et renvoyer un code d\'état 200",async ()=>{
      const groupId=groupCreted._id
      const email="gogo.great2020@gmail.com"

      const response = await request(app)
            .post(`/groups/${groupId}/invite`)
            .set('Cookie', [`${globalToken}`])
            .send({ email });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Lien d\'invitation généré avec succès.');
    })
  })

  // it('devrait accepter une invitation avec succès et renvoyer un code d\'état 200', async () => {
  //   // j'ai retirer le tocken depuit la base de donné j'ai déja _id dans groupCreted objet
  //   const invitationToken = 'valid_invitation_token';
  //   const response = await request(app)
  //       .get(`/groups/invite?token=${invitationToken}`);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('message', 'Vous avez été ajouté au groupe avec succès.');
  // });
})

// "il faut ajouter les test des cas d'échec"

// je doit changer le dataType inviteToket il faut la render array et apré certaine temps de chaque ajout d'un token il faut le supprimé