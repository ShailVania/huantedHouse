import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'




/**
 * Base
 */


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const house = new THREE.Group()
scene.add(house)

//Textures loader
const textureLoader = new THREE.TextureLoader()

//Textures for floor
const floorAlphaTexture = textureLoader.load('/floor/alpha.jpg')
const floorColorTexture = textureLoader.load('/floor/dirt_1k/dirt_diff_1k.webp')
const floorArmTexture = textureLoader.load('/floor/dirt_1k/dirt_arm_1k.webp')
const floorNormalTexture = textureLoader.load('/floor/dirt_1k/dirt_nor_gl_1k.webp')
const floorDisplacemetTexture = textureLoader.load('/floor/dirt_1k/dirt_disp_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8,8)
floorArmTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacemetTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorArmTexture.wrapS = THREE.RepeatWrapping
floorDisplacemetTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorArmTexture.wrapT = THREE.RepeatWrapping
floorDisplacemetTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

//wall textures
const wallColorTexture = textureLoader.load('/house/cracked_concrete_wall_1k/cracked_concrete_wall_diff_1k.webp')
const wallArmTexture = textureLoader.load('/house/cracked_concrete_wall_1k/cracked_concrete_wall_arm_1k.webp')
const wallNormalTexture = textureLoader.load('/house/cracked_concrete_wall_1k/cracked_concrete_wall_nor_gl_1k.webp')
wallColorTexture.colorSpace = THREE.SRGBColorSpace

//Door Textures
const doorAlphaTexture = textureLoader.load('/door/alpha.webp')
const doorAmbientOcculsionTexture = textureLoader.load('/door/ambientOcclusion.webp')
const doorColorTexture = textureLoader.load('/door/color.webp')
const doorHeightTexture = textureLoader.load('/door/height.webp')
const doorMetalnessTexture = textureLoader.load('/door/metalness.webp')
const doorNormalTexture = textureLoader.load('/door/normal.webp')
const doorRoughnessTexture = textureLoader.load('/door/roughness.webp')
doorColorTexture.colorSpace = THREE.SRGBColorSpace

//roof textures
const roofColorTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_diff_1k.webp')
const roofArmTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_arm_1k.webp')
const roofNormalTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_nor_gl_1k.webp')
// const roofDisplacemetTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_disp_1k.webp')


roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3,1)
roofArmTexture.repeat.set(3,1)
roofNormalTexture.repeat.set(3,1)
// roofDisplacemetTexture.repeat.set(6,6)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofArmTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
// roofDisplacemetTexture.wrapS = THREE.RepeatWrapping

//Rock Textures
const rockColorTexture = textureLoader.load('/rocks/rock_08_1k/rock_08_diff_1k.webp')
const rockArmTexture = textureLoader.load('/rocks/rock_08_1k/rock_08_arm_1k.webp')
const rockNormalTexture = textureLoader.load('/rocks/rock_08_1k/rock_08_nor_gl_1k.webp')
rockColorTexture.colorSpace = THREE.SRGBColorSpace

//Tomb textures
const tombColorTexture = textureLoader.load('/tomb/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const tombArmTexture = textureLoader.load('/tomb/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const tombNormalTexture = textureLoader.load('/tomb/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')
tombColorTexture.colorSpace = THREE.SRGBColorSpace

tombColorTexture.repeat.set(0.3, 0.4)
tombArmTexture.repeat.set(0.3, 0.4)
tombNormalTexture.repeat.set(0.3, 0.4)

//FirFlies Textures 
const fireFliesTexture = textureLoader.load('/particles/8.webp')


//house

//Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorArmTexture,
        roughnessMap: floorArmTexture,
        metalnessMap: floorArmTexture,
        displacementMap: floorDisplacemetTexture,
        displacementScale: 0.4,
        displacementBias: - 0.09,
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)


//House wall;
const houseWalls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallArmTexture,
        roughnessMap: wallArmTexture,
        metalnessMap: wallArmTexture,
        normalMap: wallNormalTexture,
        
    })
)
houseWalls.position.y = 1.25


//roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4, 20),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        normalMap: roofNormalTexture,
        aoMap: roofArmTexture,
        roughnessMap: roofArmTexture,
        metalnessMap: roofArmTexture,
        // displacementMap: roofDisplacemetTexture,
        // displacementBias: 0.4,
        // displacementScale: 0.3
        
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25


//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: doorAlphaTexture,
        transparent: true,
        map: doorColorTexture,
        aoMap: doorAmbientOcculsionTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementBias: - 0.04,
        displacementScale: 0.15

    })
)
door.position.y = 1
door.position.z = houseWalls.position.z + 2.01

house.add(houseWalls, roof, door)

//Rocks
const rockGeometry = new THREE.IcosahedronGeometry(2,0)
const rockMaterial = new THREE.MeshStandardMaterial({
    map: rockColorTexture,
    aoMap: rockArmTexture,
    roughnessMap: rockArmTexture,
    metalnessMap: rockArmTexture,
    normalMap: rockNormalTexture,
})

const rock1 = new THREE.Mesh(rockGeometry, rockMaterial)
rock1.scale.set(0.08, 0.05, 0.08)
rock1.position.set(1.2, 0.07, 2.17)
rock1.rotation.z = Math.PI * 0.25

const rock2 = new THREE.Mesh(rockGeometry, rockMaterial)
rock2.scale.set(0.15, 0.09, 0.09)
rock2.position.set(1.5, 0.07, 2.17)
rock2.rotation.z = Math.PI * 0.25
rock2.rotation.x = -0.85


const rock3 = new THREE.Mesh(rockGeometry, rockMaterial)
rock3.scale.set(0.15, 0.09, 0.09)
rock3.position.set(-1.5, 0.07, 2.17)
rock3.rotation.z = Math.PI * 0.35

const rock4 = new THREE.Mesh(rockGeometry, rockMaterial)
rock4.scale.set(0.08, 0.05, 0.08)
rock4.position.set(-1.22, 0.07, 2.17)
rock4.rotation.z = Math.PI * 0.35

house.add(rock1, rock2, rock3, rock4)

//graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: tombColorTexture,
    aoMap: tombArmTexture,
    roughnessMap: tombArmTexture,
    metalnessMap: tombArmTexture,
    normalMap: tombNormalTexture,
});

const grave = new THREE.Group()
scene.add(grave)

for (let i = 0; i < 20 ; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const tomb = new THREE.Mesh(graveGeometry, graveMaterial)

    tomb.position.x = x
    tomb.position.y = Math.random() * 0.4
    tomb.position.z = z

    tomb.rotation.x = (Math.random() - 0.5) * 0.4
    tomb.rotation.y = (Math.random() - 0.5) * 0.4
    tomb.rotation.z = (Math.random() - 0.5) * 0.4

    
    grave.add(tomb)
}

//ghost 
const ghost1 = new THREE.PointLight('#8800ff', 5)
const ghost2 = new THREE.PointLight('#ff0088', 5)
const ghost3 = new THREE.PointLight('#ff0000', 5)

scene.add(ghost1, ghost2, ghost3)
 
//Lights
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//doorLight
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// To hide the debug UI
window.addEventListener('keydown', (event) => {
    if(event.key == 'h')
    {
        gui.show(gui._hidden)
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.maxPolarAngle = 1.3
controls.maxDistance = 15
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
houseWalls.castShadow = true
houseWalls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

grave.children.forEach(element => {
    element.castShadow = true
    element.receiveShadow = true
});

//mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

//SKY
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

//Fog
scene.fog = new THREE.FogExp2('#02343f', 0.1)

//Fireflies
const fireFliesGeometry = new THREE.BufferGeometry()
const count = 30
const position =  new Float32Array(count * 3)

for (let i = 0; i < count * 3 ; i++) 
{
    position[i] = (Math.random() - 0.5) * 10
}
fireFliesGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

const fireFliesMaterial = new THREE.PointsMaterial()
fireFliesMaterial.size = 0.19
fireFliesMaterial.sizeAttenuation = true
// fireFliesMaterial.map = fireFliesTexture
fireFliesMaterial.alphaMap = fireFliesTexture
fireFliesMaterial.transparent = true
fireFliesMaterial.color = new THREE.Color('#ffba4d')

const fireFlies = new THREE.Points(fireFliesGeometry, fireFliesMaterial)

scene.add(fireFlies)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()
    
    //ghost angle
    const ghost1Angle = elapsedTime * 0.5
    const ghost2Angle = - elapsedTime * 0.4 
    const ghost3Angle = elapsedTime * 0.23

    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(elapsedTime * 2.34) * Math.sin(elapsedTime * 3.45) 
    
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(elapsedTime * 2.34) * Math.sin(elapsedTime * 3.45) 
    
    ghost3.position.x = Math.cos(ghost3Angle) * 4
    ghost3.position.z = Math.sin(ghost3Angle) * 5
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(elapsedTime * 2.34) * Math.sin(elapsedTime * 3.45) 

    // 
    const positions = fireFliesGeometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.002 + (Math.random() - 0.5) * 0.005;
        positions[i + 1] += 0.002 + (Math.random() - 0.5) * 0.005;
        positions[i + 2] += 0.002 + (Math.random() - 0.5) * 0.005;
    }
    fireFliesGeometry.attributes.position.needsUpdate = true
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()