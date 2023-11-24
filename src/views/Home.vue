<template>
    <div v-if="isDialog">
        <UpdateResponse :id="dialogData.id" :tagName="dialogData.tagName" :tagResponse="dialogData.tagResponse" />
    </div>
    <NavigationBar />
    <div class="container">
        <div class="input-field-alignment-container">
            <input placeholder="Search" type="text" class="search-tag-field" v-model="search">
            <span class="material-symbols-outlined">
                search
            </span>
        </div>
        <div class="response-wrapper">
            <div v-if="error" class="center-container">
                <h2>{{ error }}</h2>
            </div>
            <div v-else>
                <div v-if="originalTags.length">
                    <div v-if="filteredTags.length">
                        <div v-for="element in filteredTags" :key="element.id">
                            <Response :tagName="element.tag_name" :id="element.id" :tagResponse="element.tag_response" />
                        </div>
                    </div>
                    <div v-else class="center-container">
                        <h4>No tags found</h4>
                    </div>

                </div>
                <div v-else class="center-container">
                    <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Response from '../Components/Response.vue';
import UpdateResponse from '../Components/UpdateResponse.vue';
import NavigationBar from "../Components/NavigationBar.vue";

import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Home",
    data() {
        return {
            search: '',
        }
    },
    computed: mapGetters(["originalTags", "filteredTags", "error", "isDialog", "dialogData"]),
    components: {
        Response,
        UpdateResponse,
        NavigationBar,
    },
    methods: mapActions(["fetchTags", "filterTags"]),
    async created() {
        const result = await this.fetchTags();
        if (!result) {
            this.$router.push({ name: "Login" });
        }
    },
    watch: {
        search(newValue) {
            console.log(this.error);
            this.filterTags(newValue);
        }
    }
}
</script>

<style scoped>
.input-field-alignment-container {
    position: relative;
    display: flex;
    width: 70%;
    align-items: center;

}

.input-field-alignment-container>span {
    position: absolute;
    left: 1rem;
}

.response-wrapper {
    border-radius: 10px;
    padding: 10px;
    width: 100%;
}

.search-tag-field {
    width: 100%;
    border-radius: 10px;
    border: 2px solid #94a1b2;
    margin: 10px;
    padding: 5px;
    font-size: 20px;
    padding-left: 2rem;
    user-select: all;
}

.search-tag-field:focus {
    outline: 1px solid #005dd7;
    border: 2px solid #005dd7;

}

.container {
    width: 70%;
    margin: auto;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
}

/* Filter CSS */
.filter-option {
    margin: 20px 10px 25px;
    padding: 5px;
    border-radius: 5px;
}

.filter-option-container {
    text-align: end;
    width: 100%;
}

.center-container {
    text-align: center;
}

/* Spinner UI */
.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(0, 0, 0) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media screen and (max-width: 768px) {
    .container {
        width: 100%;
    }

    .input-field-alignment-container {
        width: 100%;
    }
}
</style>