import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'


/**
 * Base
 */
// Debug
const gui = new GUI({
    title: 'Debug UI'
})
const roofTweaks = gui.addFolder('Roof Tweaks')
const floorTweaks = gui.addFolder('Roof Tweaks')


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
const floorColorTexture = textureLoader.load('/floor/dirt_1k/dirt_diff_1k.jpg')
const floorArmTexture = textureLoader.load('/floor/dirt_1k/dirt_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('/floor/dirt_1k/dirt_nor_gl_1k.jpg')
const floorDisplacemetTexture = textureLoader.load('/floor/dirt_1k/dirt_disp_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8,8)
floorArmTexture.repeat.set(8,8)
floorDisplacemetTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorArmTexture.wrapS = THREE.RepeatWrapping
floorDisplacemetTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorArmTexture.wrapT = THREE.RepeatWrapping
floorDisplacemetTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

//wall textures
const wallColorTexture = textureLoader.load('/house/cracked_concrete_wall_1k/cracked_concrete_wall_diff_1k.jpg')
const wallArmTexture = textureLoader.load('/house/cracked_concrete_wall_1k/cracked_concrete_wall_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('/house/cracked_concrete_wall_1k/cracked_concrete_wall_nor_gl_1k.jpg')
wallColorTexture.colorSpace = THREE.SRGBColorSpace

//roof textures
const roofColorTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_diff_1k.jpg')
const roofArmTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_nor_gl_1k.jpg')
// const roofDisplacemetTexture = textureLoader.load('/house/roof_tiles_14_1k/roof_tiles_14_disp_1k.jpg')


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
const rockAlphaTexture = textureLoader.load('')
const rockColorTexture = textureLoader.load('')
const rockArmTexture = textureLoader.load('')
const rockNormalTexture = textureLoader.load('')
const rockDisplacemetTexture = textureLoader.load('')

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

floorTweaks.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
floorTweaks.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

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

// roofTweaks.add(roof.material, 'displacementScale').min(0).max(1).step(0.001).name('roofDisplacementScale')
// roofTweaks.add(roof.material, 'displacementBias').min(-1).max(1).step(0.001).name('roofDisplacementBias')

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2),
    new THREE.MeshStandardMaterial()
)
door.position.y = 1
door.position.z = houseWalls.position.z + 2.01

house.add(houseWalls, roof, door)

//Bushes
const bushGeometry = new THREE.IcosahedronGeometry(2,0)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.08, 0.05, 0.08)
bush1.position.set(1.2, 0.07, 2.17)
bush1.rotation.z = Math.PI * 0.25

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.15, 0.09, 0.09)
bush2.position.set(1.5, 0.07, 2.17)
bush2.rotation.z = Math.PI * 0.25

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.15, 0.09, 0.09)
bush3.position.set(-1.5, 0.07, 2.17)
bush3.rotation.z = Math.PI * 0.35

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.08, 0.05, 0.08)
bush4.position.set(-1.22, 0.07, 2.17)
bush4.rotation.z = Math.PI * 0.35

house.add(bush1, bush2, bush3, bush4)

//graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial();

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

 
//Lights
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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
// camera.position.x = 
// camera.position.y = 2
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()