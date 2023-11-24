<template>
    <div class="response-container">
        <div class="response-data">
            <div class="tag-name"> {{ tagName }}</div>
            <div class="tag-response"> {{ tagResponse }}</div>
        </div>
        <div class="response-editor">
            <div @click="openDialog({ id, tagName, tagResponse })">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import UpdateResponse from './UpdateResponse.vue';
export default {
    name: "Response",
    props: {
        id: Number,
        tagName: String,
        tagResponse: String,
    },
    components: {
        UpdateResponse
    },
    methods: {
        ...mapActions(["openDialog"])
    },
}
</script>

<style scoped>
.response-container {
    background-color: white;
    margin: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: transform 200ms ease-in-out;
}

.response-container:hover {
    transform: scale(1.02);
}

.response-data {
    margin-left: 10px;
    width: 100%;
}

.tag-name {
    font-weight: 600;
}

.tag-response {
    color: rgba(0, 0, 0, 0.6);
    display: inline-block;
    white-space: nowrap;
    width: 200px;
    overflow: hidden !important;
    text-overflow: ellipsis;
}

.response-editor {
    margin: 5px;
    background-color: rgba(196, 201, 205, 0.805);
    padding: 5px;
    cursor: pointer;
}
</style>