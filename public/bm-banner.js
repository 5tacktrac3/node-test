
// Positions
// ---------

const edge_positions = [
    [  6.0,   6.0,   0.0,    0.1,   0.1,   1.3	],  // 2
    [ -6.0,   6.0,   0.0,    0.1,   0.1,   1.3	],  // 3
    [  0.0,   6.0,   6.0,    1.3,   0.1,   0.1	],  // 4
    [  0.0,   6.0,  -6.0,    1.3,   0.1,   0.1	],  // 5
    [  6.0,  -6.0,   0.0,    0.1,   0.1,   1.3	],  // 6
    [ -6.0,  -6.0,   0.0,    0.1,   0.1,   1.3	],  // 7
    [  0.0,  -6.0,   6.0,    1.3,   0.1,   0.1	],  // 8
    [  0.0,  -6.0,  -6.0,    1.3,   0.1,   0.1	],  // 9
    [  6.0,   0.0,  -6.0,    0.1,   1.2,   0.1	],  // 10
    [ -6.0,   0.0,   6.0,    0.1,   1.2,   0.1	],  // 11
    [  6.0,   0.0,   6.0,    0.1,   1.2,   0.1	],  // 12
    [ -6.0,   0.0,  -6.0,    0.1,   1.2,   0.1	]   // 13
];


// Set-up
// ------

var _3dPanel = document.getElementById('banner'); 

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// Camera
let camera = new THREE.PerspectiveCamera( 75, _3dPanel.clientWidth / _3dPanel.clientHeight, 0.1, 1000 );
camera.position.z = 2;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( _3dPanel.clientWidth, _3dPanel.clientHeight );
_3dPanel.appendChild( renderer.domElement );

// All Cubes List
var allCubes = [];


// Builder Functions
// -----------------

// Draw Edge Cube
function edgedraw( tX, tY, tZ, sX, sY, sZ) {
    const geo = new THREE.BoxGeometry();
    geo.translate( tX, tY, tZ );
    geo.scale( sX, sY, sZ );
    const mat = new THREE.MeshBasicMaterial( { color: 0x111111} );
    const cu = new THREE.Mesh( geo, mat );
    return cu;
}

// Center Cube
function drawcube() {
    const geometry = new THREE.BoxGeometry();
    geometry.scale( 1.1, 1.1, 1.1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xFF7E00 } );
    const cube = new THREE.Mesh( geometry, material );
    return cube;
}

function InitScene() {

    // Center Cube
    const cube = drawcube()
    allCubes.push( cube )
    scene.add( cube );

    // Edge Cubes
    for ( let index = 0; index < edge_positions.length; index++ ) {
        let current = edge_positions[index];
        let newCube = edgedraw( current[0], current[1], current[2], current[3], current[4], current[5] );
        allCubes.push( newCube );
        scene.add( newCube );
    }			

}

const animate = function () {

    requestAnimationFrame( animate );    

    allCubes.forEach( eachCube => {
        eachCube.rotation.x += 0.005;
        eachCube.rotation.y += 0.005;
    } );

    camera.aspect = _3dPanel.clientWidth / _3dPanel.clientHeight;    
    camera.updateProjectionMatrix();
    renderer.setSize( _3dPanel.clientWidth, _3dPanel.clientHeight );

    renderer.render( scene, camera );
};

InitScene();
animate();      
