<template>
    <div>
        <p style="color:black;">유저 로그인</p>
        <a href="http://localhost:3000/api/auth/google/user/">
            <img  src="../../assets/google_signin.png" alt='구글 로그인 아이콘'/>
        </a>
        <p style="color:black;">가이드 로그인</p>
        <a href="http://localhost:3000/api/auth/google/guide/">
            <img  src="../../assets/google_signin.png" alt='구글 로그인 아이콘'/>
        </a>      
    </div>
</template>
<script>
export default {
    name: 'SignInBtn',

    data() {
        return {
        }
    },
}
</script>
