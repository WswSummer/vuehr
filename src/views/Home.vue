<template>
    <div>
        <el-container>
            <!-- 顶部菜单栏 -->
            <el-header class="homeHeader">
                <div class="title">微人事</div>
                <el-dropdown class="userInfo" @command="commandHandler">
                    <span class="el-dropdown-link">
                        {{user.name}}<i><img :src="user.userface" alt=""></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <!-- 左边菜单栏 -->
                <!-- 左边菜单栏自动渲染，根据router.js -->
                <el-aside width="200px">
                    <el-menu router>
                        <template v-for="(item, index) in this.$router.options.routes">
                            <el-submenu index="1" v-if="!item.hidden" :key="index">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item :index="child.path" v-for="(child, indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-aside>
                <!-- 右边菜单栏 -->
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                // 取出user用户信息
                user: JSON.parse(window.sessionStorage.getItem("user"))
            };
        },
        methods: {
            // 顶部菜单栏的功能实现
            commandHandler(cmd) {
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem('user');
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        },
    };
</script>

<style>
    .homeHeader {
        background-color: dodgerblue;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: white;
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
</style>