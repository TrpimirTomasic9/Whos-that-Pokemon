<script setup lang="ts">
import {Sunny, Moon} from '@element-plus/icons-vue'

</script>

<template>
    <el-header class="navbar">
        <div class="navbar-content">
            <div>
                <img class="logo" src="/src/assets/images/logo.png" />
            </div>
            <el-space size="large">
                <div>
                    <input class="search" type="text" placeholder="Search pokemon" />

                </div>
                <div>
                    <el-button link><el-icon :size="20">
                            <Sunny />
                        </el-icon></el-button>
                    <el-button link><el-icon :size="20">
                            <Moon />
                        </el-icon></el-button>
                </div>
                <div>
                    <el-button class="pokedexBtn">Pokedex</el-button>
                </div>
                <div>
                    <el-button text @click="centerDialogVisible = true">LogOut</el-button>
                </div>
            </el-space>
            <el-dialog v-model="centerDialogVisible" title="Register" width="50%" height="50%" center>
    <el-form label-position='top' status-icon ref="ruleFormRef" :label-width="80">

        <el-form-item label="Username">
            <el-input autofocus placeholder="jsmith" type="text" />
        </el-form-item>

        <el-form-item label="Password">
            <el-input type="password" />
        </el-form-item>

        <el-button size='large' type="primary" class="w-full">Submit</el-button>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">
                Confirm
            </el-button>
        </span>
    </template>
</el-dialog>
        </div>
    </el-header>
</template>

<style scoped>
.navbar {
  background-color: whitesmoke;
  padding: 5px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.navbar-content{
    align-items: center;
    justify-content: space-between;
    display: flex;
}

.logo{
    width: 100%;
    max-width: 50px;
    display: block;
}
.search{
    display: block;
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    background-color: transparent;
    float: right;
}

.search::placeholder {
  opacity: 0.5;
}

.navbar-right{
    align-items: center;
    justify-content: space-between;
}

.pokedexBtn{
    background-color: black;
    color: whitesmoke;
}
</style>