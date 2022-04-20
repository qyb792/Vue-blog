<template>
  <div>
    <div class="comment-title"><i class="iconfont iconpinglunzu" />评论</div>
    <!-- 评论框 -->
    <div class="comment-input-wrapper">
      <div style="display: flex">
        <el-avatar>
          <img
            v-if="this.$store.state.avatar"
            :src="this.$store.state.avatar"
          />
          <img
            v-else
            :src="this.$store.state.blogInfo.websiteConfig.touristAvatar"
          />
        </el-avatar>
        <div style="width: 100%" class="ml-3">
          <div class="comment-input">
            <!-- <textarea
              class="comment-textarea"
              v-model="commentContent"
              placeholder="留下点什么吧..."
              auto-grow
              dense
            /> -->
            <div
              class="mavonEditor"
              style="
                width: 100%;
                max-height: 125px;
                min-height: 75px;
                overflow-y: auto;
              "
            >
              <mavon-editor
                defaultOpen="edit"
                :subfield="false"
                :toolbars="markdownOption"
                v-model="commentContent"
                :toolbarsFlag="false"
                :shortCut="false"
                boxShadowStyle=""
              />
            </div>
          </div>
          <!-- 操作按钮 -->
          <div class="emoji-container">
            <span
              :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'"
              @click="chooseEmoji = !chooseEmoji"
            >
              <i class="iconfont iconbiaoqing" />
            </span>
            <!-- <button
              @click="insertComment"
              class="upload-btn v-comment-btn"
              style="margin-left: auto"
            >
              提交
            </button> -->
            <el-button
              @click="insertComment"
              class="upload-btn v-comment-btn"
              style="margin-left: auto"
              type="primary"
              size="small"
              >提交</el-button
            >
          </div>
          <!-- 表情框 -->
          <emoji @addEmoji="addEmoji" :chooseEmoji="chooseEmoji" />
        </div>
      </div>
    </div>
    <!-- 评论详情 -->
    <div v-if="count > 0 && reFresh">
      <!-- 评论数量 -->
      <div class="count">{{ count }} 评论</div>
      <!-- 每一个评论列表 -->
      <div
        v-for="(item, index) of commentList"
        :key="item.id"
        :class="item.userId == 1 ? 'qyb-comment-right' : 'qyb-comment'"
      >
        <!-- 头像 -->
        <el-avatar :size="48" class="qyb-avatar" shape="square">
          <img :src="item.avatar" />
        </el-avatar>
        <div class="qyb-main">
          <!-- 用户名 -->
          <div class="qyb-row">
            <div class="qyb-action" v-if="item.id !== 1">
              <span v-if="isLike(item.likeCount)" class="qyb-action-link">
                <span class="qyb-action-icon tm" @click="like(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"
                    />
                  </svg>
                </span>
                <span class="qyb-action-icon ls" @click="like(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                    />
                  </svg>
                </span>
              </span>
              <span v-else class="qyb-action-link">
                <span class="qyb-action-icon" @click="like(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                    />
                  </svg>
                </span>
                <span v-show="item.likeCount > 0"> {{ item.likeCount }}</span>
              </span>

              <!-- 回复评论 -->
              <span class="qyb-action-link" v-if="isLike(item.replyCount)">
                <span
                  class="qyb-action-icon tm"
                  @click="replyComment(index, item)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"
                    />
                  </svg>
                </span>
                <span
                  class="qyb-action-icon ls"
                  @click="replyComment(index, item)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                    />
                  </svg>
                </span>
              </span>
              <span class="qyb-action-link" v-else>
                <span
                  class="qyb-action-icon"
                  @click="replyComment(index, item)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                    />
                  </svg>
                </span>
                <span v-show="item.replyCount > 0"> {{ item.replyCount }}</span>
              </span>
            </div>
            <div class="qyb-meta" v-else>
              <strong class="qyb-nick" v-if="!item.webSite">{{
                item.nickname
              }}</strong>
              <a v-else :href="item.webSite" target="_blank">
                <strong class="qyb-nick">{{ item.nickname }}</strong>
              </a>
              <span class="blogger-tag" v-if="item.userId == 1">博主</span>

              <small class="qyb-time">
                <time>
                  {{ item.createTime | date }}
                </time>
              </small>
            </div>
            <div class="qyb-meta" v-if="!item.id !== 1">
              <strong class="qyb-nick" v-if="!item.webSite">{{
                item.nickname
              }}</strong>
              <a v-else :href="item.webSite" target="_blank">
                <strong class="qyb-nick">{{ item.nickname }}</strong>
              </a>
              <span class="blogger-tag" v-if="item.userId == 1">博主</span>

              <small class="qyb-time">
                <time>
                  {{ item.createTime | date }}
                </time>
              </small>
            </div>
            <div class="qyb-action" v-else>
              <span v-if="isLike(item.likeCount)" class="qyb-action-link">
                <span class="qyb-action-icon tm" @click="like(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"
                    />
                  </svg>
                </span>
                <span class="qyb-action-icon ls" @click="like(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                    />
                  </svg>
                </span>
              </span>
              <span v-else class="qyb-action-link">
                <span class="qyb-action-icon" @click="like(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                    />
                  </svg>
                </span>
                <span v-show="item.likeCount > 0"> {{ item.likeCount }}</span>
              </span>

              <!-- 回复评论 -->
              <span class="qyb-action-link" v-if="isLike(item.replyCount)">
                <span
                  class="qyb-action-icon tm"
                  @click="replyComment(index, item)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"
                    />
                  </svg>
                </span>
                <span
                  class="qyb-action-icon ls"
                  @click="replyComment(index, item)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                    />
                  </svg>
                </span>
              </span>
              <span class="qyb-action-link" v-else>
                <span
                  class="qyb-action-icon"
                  @click="replyComment(index, item)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                    />
                  </svg>
                </span>
                <span v-show="item.replyCount > 0"> {{ item.replyCount }}</span>
              </span>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="qyb-content">
            <span>
              <p v-html="item.commentContent" class="comment-content"></p>
            </span>
          </div>

          <!-- 回复人 -->
          <div
            v-for="reply of item.replyDTOList"
            :key="reply.id"
            :class="reply.userId == 1 ? 'qyb-comment-right' : 'qyb-comment'"
          >
            <!-- 头像 -->
            <el-avatar :size="48" class="qyb-avatar" shape="square">
              <img :src="reply.avatar" />
            </el-avatar>
            <div class="qyb-main">
              <!-- 用户名 -->
              <div
                class="qyb-row"
                :style="reply.userId == 1 ? '' : 'flex-direction: row-reverse'"
              >
                <div class="qyb-action">
                  <span v-if="isLike(reply.likeCount)" class="qyb-action-link">
                    <span class="qyb-action-icon tm" @click="like(reply)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"
                        />
                      </svg>
                    </span>
                    <span class="qyb-action-icon ls" @click="like(reply)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                        />
                      </svg>
                    </span>
                  </span>
                  <span v-else class="qyb-action-link">
                    <span class="qyb-action-icon" @click="like(reply)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                        />
                      </svg>
                    </span>
                    <span v-show="reply.likeCount > 0">
                      {{ reply.likeCount }}</span
                    >
                  </span>

                  <!-- 回复评论 -->
                  <span class="qyb-action-link" v-if="isLike(reply.replyCount)">
                    <span
                      class="qyb-action-icon tm"
                      @click="replyComment(index, reply)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"
                        />
                      </svg>
                    </span>
                    <span
                      class="qyb-action-icon ls"
                      @click="replyComment(index, reply)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                        />
                      </svg>
                    </span>
                  </span>
                  <span class="qyb-action-link" v-else>
                    <span
                      class="qyb-action-icon"
                      @click="replyComment(index, reply)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                        />
                      </svg>
                    </span>
                    <span v-show="reply.replyCount > 0">
                      {{ reply.replyCount }}</span
                    >
                  </span>
                </div>

                <div class="qyb-meta">
                  <strong class="qyb-nick" v-if="!reply.webSite">{{
                    reply.nickname
                  }}</strong>
                  <a v-else :href="reply.webSite" target="_blank">
                    <strong class="qyb-nick">{{ reply.nickname }}</strong>
                  </a>
                  <span class="blogger-tag" v-if="reply.userId == 1">博主</span>

                  <small class="qyb-time">
                    <time>
                      {{ reply.createTime | date }}
                    </time>
                  </small>
                </div>
              </div>
              <!-- 评论内容 -->
              <div class="qyb-content">
                <!-- 回复用户名 -->
                <template>
                  回复
                  <span v-if="!reply.replyWebSite" style="color: #eeecaa">
                    @{{ reply.replyNickname }}
                  </span>
                  <a
                    v-else
                    :href="reply.replyWebSite"
                    target="_blank"
                    class="comment-nickname"
                    style="color: #eeecaa"
                  >
                    @{{ reply.replyNickname }}
                  </a>
                  ：
                </template>
                <span>
                  <p v-html="item.commentContent" class="comment-content"></p>
                </span>
              </div>
            </div>
          </div>
          <!-- 回复数量 -->
          <div
            style="font-size: 0.75rem; color: #6d757a; margin-bottom: 12px"
            v-show="item.replyCount > 3"
            ref="check"
          >
            共
            <b>{{ item.replyCount }}</b>
            条回复，
            <span
              style="color: #00a1d6; cursor: pointer"
              @click="checkReplies(index, item)"
            >
              点击查看
            </span>
          </div>
          <!-- 回复分页 -->
          <div
            style="
              font-size: 0.75rem;
              color: #222;
              display: none;
              margin-bottom: 12px;
            "
            ref="paging"
          >
            <span style="padding-right: 10px">
              共{{ Math.ceil(item.replyCount / 5) }}页
            </span>
            <paging
              ref="page"
              :totalPage="Math.ceil(item.replyCount / 5)"
              :index="index"
              :commentId="item.id"
              @changeReplyCurrent="changeReplyCurrent"
            />
          </div>
          <!-- 回复框 -->
          <Reply :type="type" ref="reply" @reloadReply="reloadReply" />
        </div>
      </div>
      <!-- 加载按钮 -->
      <div class="load-wrapper">
        <el-button v-if="count > commentList.length" @click="listComments">
          加载更多...
        </el-button>
      </div>
    </div>
    <!-- 没有评论提示 -->
    <div v-else style="padding: 1.25rem; text-align: center">来发评论吧~</div>
  </div>
</template>

<script>
import Reply from './Reply';
import Paging from './Paging';
import Emoji from './Emoji';
import { EmoticonList } from 'qyb-blog-emoticon';
import request from '@/utils/request';

export default {
  components: {
    Reply,
    Emoji,
    Paging,
  },
  props: {
    type: {
      type: Number,
    },
  },
  created() {
    this.listComments();
  },
  data: function () {
    return {
      markdownOption: {
        bold: true, // 粗体
        subfield: false,
      },
      handbook: '#### how to use mavonEditor in nuxt.js',
      reFresh: true,
      commentContent: '',
      chooseEmoji: false,
      current: 1,
      commentList: [],
      count: 0,
    };
  },
  methods: {
    replyComment(index, item) {
      this.$refs.reply.forEach((item) => {
        item.$el.style.display = 'none';
      });
      //传值给回复框
      this.$refs.reply[index].commentContent = '';
      this.$refs.reply[index].nickname = item.nickname;
      this.$refs.reply[index].replyUserId = item.userId;
      this.$refs.reply[index].parentId = this.commentList[index].id;
      this.$refs.reply[index].chooseEmoji = false;
      this.$refs.reply[index].index = index;
      this.$refs.reply[index].$el.style.display = 'block';
    },
    addEmoji(key) {
      this.commentContent += key;
    },
    checkReplies(index, item) {
      request('/comments/' + item.id + '/replies', {
        params: { current: 1, size: 5 },
      }).then(({ data }) => {
        this.$refs.check[index].style.display = 'none';
        item.replyDTOList = data;
        //超过1页才显示分页
        if (Math.ceil(item.replyCount / 5) > 1) {
          this.$refs.paging[index].style.display = 'flex';
        }
      });
    },
    changeReplyCurrent(current, index, commentId) {
      //查看下一页回复
      request('/comments/' + commentId + '/replies', {
        params: { current: current, size: 5 },
      }).then(({ data }) => {
        this.commentList[index].replyDTOList = data;
      });
    },
    listComments() {
      //查看评论
      const path = this.$route.path;
      const arr = path.split('/');
      var param = {
        current: this.current,
        type: this.type,
      };
      switch (this.type) {
      case 1:
      case 3:
        param.topicId = arr[2];
        break;
      default:
        break;
      }
      request('/comments', {
        params: param,
      }).then(({ data }) => {
        if (this.current === 1) {
          this.commentList = data.recordList;
        } else {
          this.commentList.push(...data.recordList);
        }
        this.current++;
        this.count = data.count;
        this.$emit('getCommentCount', this.count);
      });
    },
    insertComment() {
      //判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }
      //判空
      if (this.commentContent.trim() === '') {
        this.$message({ type: 'error', message: '评论不能为空' });
        return false;
      }
      //解析表情
      var reg = /\[.+?\]/g;
      this.commentContent = this.commentContent.replace(reg, function (str) {
        return (
          '<img src= \'' +
          EmoticonList[str] +
          '\' width=\'50\'height=\'50\' style=\'margin: 0 1px;vertical-align: text-bottom\'/>'
        );
      });
      //发送请求
      const path = this.$route.path;
      const arr = path.split('/');
      var comment = {
        commentContent: this.commentContent,
        type: this.type,
      };
      switch (this.type) {
      case 1:
      case 3:
        comment.topicId = arr[2];
        break;
      default:
        break;
      }
      this.commentContent = '';
      request.post('/comments', comment).then((data) => {
        if (data.flag) {
          // 查询最新评论
          this.current = 1;
          this.listComments();
          const isReview =
            this.$store.state.blogInfo.websiteConfig.isCommentReview;
          if (isReview) {
            this.$message({
              type: 'warnning',
              message: '评论成功，正在审核中',
            });
          } else {
            this.$message({ type: 'success', message: '评论成功' });
          }
        } else {
          this.$message({ type: 'error', message: data.data.message });
        }
      });
    },
    like(comment) {
      // 判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true;
        return false;
      }
      // 发送请求
      request.post('/comments/' + comment.id + '/like').then((data) => {
        if (data.flag) {
          // 判断是否点赞
          if (this.$store.state.commentLikeSet.indexOf(comment.id) !== -1) {
            this.$set(comment, 'likeCount', comment.likeCount - 1);
          } else {
            this.$set(comment, 'likeCount', comment.likeCount + 1);
          }
          this.$store.commit('commentLike', comment.id);
        }
      });
    },
    reloadReply(index) {
      request('/comments/' + this.commentList[index].id + '/replies', {
        params: {
          current: this.$refs.page[index].current,
          size: 5,
        },
      }).then((data) => {
        this.commentList[index].replyCount++;
        //回复大于5条展示分页
        if (this.commentList[index].replyCount > 5) {
          this.$refs.paging[index].style.display = 'flex';
        }
        this.$refs.check[index].style.display = 'none';
        this.$refs.reply[index].$el.style.display = 'none';
        this.commentList[index].replyDTOList = data.data;
      });
    },
  },
  computed: {
    isLike() {
      return function (count) {
        return parseInt(count) > 0 ? false : true;
      };
    },
  },
  watch: {
    commentList() {
      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.qyb-comment {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  word-break: break-all;

  & > .qyb-avatar {
    margin-top: 1rem;
    margin-right: 1rem;
  }

  & > .qyb-main {
    flex: 1;
    width: 0;

    & > .qyb-row {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      max-width: 100%;
      width: fit-content;
      margin-left: 10px;

      .qyb-meta {
        small {
          font-size: 80%;
        }

        .qyb-time {
          color: #4c4948;
        }

        .qyb-nick {
          color: #4c4948;
        }
      }

      .qyb-action {
        display: flex;
        align-items: center;

        .qyb-action-link {
          margin-left: 0.5rem;
          color: #409eff;
          text-decoration: none;
          display: flex;
          align-items: center;

          &:hover .ls {
            display: inline-block !important;
          }

          &:hover .tm {
            display: none !important;
          }

          & .qyb-action-icon {
            display: inline-block;
            height: 1em;
            width: 1em;
            line-height: 0;

            svg {
              fill: #409eff;
              width: 0.875rem;
              height: 0.875rem;
            }
          }

          .tm {
            display: inline-block;
          }
          .ls {
            display: none;
          }
        }
      }
    }

    & > .qyb-content {
      background: #00a6ff;
      padding: 10px;
      left: 8px;
      color: #fff;
      border-radius: 10px;
      font-size: 16px !important;
      width: fit-content;
      max-width: 100%;
      position: relative !important;
      overflow: visible !important;
      max-height: none !important;
      margin-top: 0.5rem;
      &::before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 20px;
        left: -13px;
        border-top: 2px solid transparent;
        border-bottom: 20px solid transparent;
        border-right: 15px solid #00a6ff;
        border-left: 0 solid transparent;
      }
    }
  }
}

.like {
  cursor: pointer;
  font-size: 0.875rem;
}
.like:hover {
  color: #eb5055;
}
.like-active {
  cursor: pointer;
  font-size: 0.875rem;
  color: #eb5055;
}

.blogger-tag {
  padding: 5px 5px;
  margin-left: 6px;
  background-color: rgba(103, 194, 58, 0.13);
  border: 1px solid rgba(103, 194, 58, 0.5);
  border-radius: 2px;
  color: #67c23a;
}
.comment-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 40px;
  margin-bottom: 10px;
}
.comment-title i {
  font-size: 1.5rem;
  margin-right: 5px;
}
.comment-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
}


.count {
  padding: 5px;
  line-height: 1.75;
  font-size: 1.25rem;
  font-weight: bold;
}
</style>

<style lang="less" scoped>
.qyb-comment-right {
  margin-top: 1rem;
  display: flex;
  flex-direction: row-reverse;
  word-break: break-all;

  & > .qyb-avatar {
    margin-top: 1rem;
    margin-left: 1rem;
  }

  & > .qyb-main {
    flex: 1;
    width: 0;
    margin-right: 10px;

    & > .qyb-row {
      flex: 1;
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      flex-direction: row-reverse;
      max-width: 100%;
      width: fit-content;
      margin-left: 10px;
      width: 100%;

      .qyb-meta {
        small {
          font-size: 80%;
        }

        .qyb-time {
          color: #4c4948;
        }

        .qyb-nick {
          color: #4c4948;
        }
      }

      .qyb-action {
        display: flex;
        align-items: center;

        .qyb-action-link {
          margin-left: 0.5rem;
          color: #409eff;
          text-decoration: none;
          display: flex;
          align-items: center;

          &:hover .ls {
            display: inline-block !important;
          }

          &:hover .tm {
            display: none !important;
          }

          & .qyb-action-icon {
            display: inline-block;
            height: 1em;
            width: 1em;
            line-height: 0;

            svg {
              fill: #409eff;
              width: 0.875rem;
              height: 0.875rem;
            }
          }

          .tm {
            display: inline-block;
          }
          .ls {
            display: none;
          }
        }
      }
    }

    & > .qyb-content {
      background: #ff8080;
      padding: 10px;
      left: 8px;
      color: #fff;
      border-radius: 10px;
      font-size: 16px !important;
      width: fit-content;
      max-width: 100%;
      position: relative !important;
      overflow: visible !important;
      max-height: none !important;
      margin-top: 0.5rem;
      width: 100%;
      &::before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 20px;
        right: -13px;
        border-top: 2px solid transparent;
        border-bottom: 20px solid transparent;
        border-right: 0 solid transparent;
        border-left: 15px solid #ff8080;
      }
    }
  }
}
</style>


<style lang="less" scoped>
.v-note-wrapper {
  position: relative;
  min-width: 300px;
  min-height: 125px;
}
</style>