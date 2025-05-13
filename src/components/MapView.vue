<template>
  <div class="map-view">
    <div class="top-bar">
      <el-button circle size="small" class="back-btn" @click="handleBack">
        <el-icon><i-ep-back /></el-icon>
      </el-button>
      <span class="title">地图</span>
    </div>
    <div id="container"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useRouter } from 'vue-router';

const router = useRouter();
let map = null;
const currentLocation = ref({
  latitude: 30.302504,
  longitude: 120.08344
});

// 獲取當前位置
const getCurrentLocation = async () => {
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    const [latitude, longitude] = data.loc.split(',');
    currentLocation.value = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
    return currentLocation.value;
  } catch (error) {
    console.error('Error fetching IP location:', error);
    return currentLocation.value;
  }
};

// 處理返回按鈕
const handleBack = () => {
  router.push('/');
};

onMounted(async () => {
  // 獲取位置
  const location = await getCurrentLocation();
  
  window._AMapSecurityConfig = {
    securityJsCode: "d5f874b3ae5240f63e248768e6bb4213",
  };

  AMapLoader.load({
    key: "2ea1329a52e0de9197ae4a5fc427181a",
    version: "2.0",
    plugins: ["AMap.Scale"],
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        viewMode: "3D",
        rotateEnable: true,
        pitchEnable: true,
        zoom: 19,
        center: [location.longitude, location.latitude],
      });

      // 添加定位標記
      const marker = new AMap.Marker({
        position: [location.longitude, location.latitude],
        title: '當前位置'
      });
      map.add(marker);

      AMap.plugin(['AMap.ControlBar', 'AMap.ToolBar'], function () {
        var controlBar = new AMap.ControlBar({
          position: {
            right: '10px',
            top: '10px'
          }
        });
        map.addControl(controlBar);
        var toolBar = new AMap.ToolBar({
          position: {
            right: '40px',
            top: '110px'
          }
        });
        map.addControl(toolBar)
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});

</script>

<style lang="scss" scoped>
.map-view {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fff;

  .top-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);

    .title {
      font-size: 18px;
      font-weight: bold;
    }

    .back-btn {
      position: absolute;
      left: 16px;
      top: 8px;
      background: rgba(245, 245, 245, 0.9);
      border: none;
    }
  }

  #container {
    width: 100%;
    height: calc(100vh - 48px);
    margin-top: 48px;
  }
}

.custom-content-marker {
  text-align: center;
  width: 190px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid #0004a1;
  background: rgba(183, 226, 255, 0.7);
}
</style> 