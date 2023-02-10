<script setup>
</script>

<template>
        <div>
        <el-dialog v-model="game" title="Who's that pokemon?" width="35%" height="50%" center>
            <el-form label-position='top' status-icon :label-width="80">

            </el-form>
            <div class="footer">
                <div class="inputDiv">
                    <input class="pokeNameInput" type="text" placeholder="Search pokemon" />
                </div>
                <span>
                    <el-button id="submitBtn" @click="LogInModalVisible = false">Submit</el-button>
                    <el-button id="skipBtn" @click="LogInModalVisible = false;">Skip
                        <el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button>
                    <el-button id="pokedexGameBtn" @click="LogInModalVisible = false">Pokedex</el-button>
                </span>
            </div>
        </el-dialog>
      </div>
</template>