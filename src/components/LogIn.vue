<script setup>
import { ref, onMounted } from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios';
import { useLoginStore } from '../store/loginStore';

const LogInModalVisible = ref(true)
const loginStore = useLoginStore();

var baseURL = 'http://localhost:3000/'
var userURL = baseURL + "users";

let users = ref(null)
let username = ref("")
let email = ref("")
let password = ref("")
let login = ref(true)
let signup = ref(true)

let usernameError = ref(null)
let emailError = ref(null)
let passwordError =ref(null)
let signupvalidation = ref(false)


onMounted(async () => {
    try {
            const res = await axios.get(baseURL + 'users');
            users = res.data;
           /*  console.log(users) */

            /* loginSubmit() */
        } catch (e) {
            console.error(e)
        }
  })

async function loginSubmit()
{
    if(email.lenght == 0)
    {
        this.emailError = "Field is empty"
    }
    else
    {
        this.emailError = null
    }

    if(password.length == 0)
    {
        this.passwordError = "Field is empty!";
    }
    else if(password.length>0 && password.length<8)
    { 
        this.passwordError = "Password is too short!"
    }
    else
    {
        this.passwordError = null
    }

    /* const res = await axios.get(userURL);
    this.users = res.data; */
    let passwordValidation = true;

    /* console.log(this.email)
    console.log(this.password) */

    for (var i = 0; i <users.length; i++)
        {
            if ((this.users[i].email == this.email) && (this.users[i].password == this.password))
            {
                passwordValidation = false;
                VueCookies.set('username', this.users[i].username, "120min");
                VueCookies.set('email', this.email, "120min");
                /* VueCookies.set('password', this.password, "120min"); */
                VueCookies.set('id', this.users[i].id, "120min");

                loginStore.loggedIn = this.users[i].username;

                window.location.href = '/';
                alert("Login successful");
                break
            }
            
        }
    if(passwordValidation)
    { 
        this.passwordError = "Inccorect password or username!"
    }
    else 
    {
        this.passwordError = ""
    }
}

async function signUpSubmit(){
    if (username.lenght == 0)
    {
        this.usernameError = "Field is empty"
    }
    else{
        this.usernameError = null
    }
    if (email.lenght == 0)
    {
        this.emailError = "Field is empty"
    }
    else{
        this.emailError = null
    }
    
    for (var i = 0; i <users.length; i++)
    {
        if(this.users[i].email == this.email)
        {
            this.signupvalidation = false;
            this.emailError = "This email address is already un use!"
            console.log(this.users[i].email)
        }
    }

    if(password.length == 0)
    {
        this.passwordError = "Field is empty!";
    }
    else if(password.length>0 && password.length<8)
    { 
        this.passwordError = "Password is too short!"
    }
    else
    {
        this.passwordError = null
    }

    if(this.usernameError == null && this.emailError == null && this.passwordError == null)
    {
        if(this.signupvalidation == true)
        {
            const res = await axios.post(baseURL + "users",
            {
                username: this.username,
                email: this.email,
                password: this.password
            });
            alert("SignUp successful");
            console.log(username)
            console.log(email)
            console.log(password)
            
        }
    }
}

</script>

<template>
    <div v-if="login" >
        <el-dialog v-model="LogInModalVisible" title="LogIn" width="50%" height="50%" center>
            <el-form label-position='top' status-icon :label-width="80">

                <el-form-item label="Email">
                    <el-input type="email" id='email' aria-placeholder="Enter Email" v-model="email" />
                    <div class="input-message" v-if="emailError">
                        <h6>{{emailError}}</h6>
                    </div>
                </el-form-item>

                <el-form-item label="Password">
                    <el-input type="password" id='password' aria-placeholder="Enter Password" v-model="password" />

                    <div class="input-message" v-if="passwordError">
                        <h6>{{passwordError}}</h6>
                    </div>
                </el-form-item>
            </el-form>
            <div class="footer">
                <span>
                    <el-button @click = "LogInModalVisible = false" >Cancel</el-button>
                    <el-button type="primary" @click="loginSubmit()">
                        LogIn
                    </el-button>
                </span>
                <div class="linkDiv">
                <p>Not a member?</p>
                <el-link type="primary" @click='login =  false'>Sign-up now!</el-link>
            </div>
        </div>
        </el-dialog>
    </div>

    <div v-else>
        <el-dialog v-model="LogInModalVisible" title="SignUp" width="50%" height="50%" center>
            <el-form lebel-position='top' status-icon :label-width="80">

                <el-form-item label="Username">
                    <el-input type="text" id="username" aria-placeholder="Enter Username" v-model="username" />
                    <div class="input-message" v-if="usernameError">
                        <h6>{{ usernameError }}</h6>
                    </div>
                </el-form-item>

                <el-form-item label="Email">
                    <el-input type="email" id="email" aria-placeholder="Enter Email" v-model="email" />
                    <div class="input-message" v-if="emailError">
                        <h6>{{ emailError }}</h6>
                    </div>
                </el-form-item>

                <el-form-item label="Password">
                    <el-input type="password" id="password" aria-placeholder="Enter Password" v-model="password" />
                    <div class="input-message" v-if="passwordError">
                        <h6>{{ passwordError }}</h6>
                    </div>
                </el-form-item>
            </el-form>
            <div class="footer">
                <span class="dialog-footer">
                    <el-button @click = "LogInModalVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="signUpSubmit()">
                        SignUp
                    </el-button>
                </span>
                <div class="linkDiv">
                <p>Already a member?</p>
                <el-link type="primary" @click='login =  true'>Log-In now!</el-link>
            </div>
        </div>
        </el-dialog>
    </div>
</template>

<style scoped>
.linkDiv{
    padding-top: 15px;
}
p {
    padding-bottom: 10px;
}
.footer{
    text-align: center;
    padding-top: 10px;
}
</style>