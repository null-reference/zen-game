import { Canvas } from '@react-three/fiber'
import { Physics, useBox, useSphere } from '@react-three/cannon'
import { Suspense } from 'react'

function Ball() {
  const [ref] = useSphere(() => ({ mass: 1, position: [0,5,0] }))
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.2,32,32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function Peg({ position }) {
  const [ref] = useBox(() => ({ args: [0.2,0.2,0.2], position, type: 'Static' }))
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.2,0.2,0.2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

function Floor() {
  const [ref] = useBox(() => ({ args: [10,0.1,10], position: [0,-0.05,0], type: 'Static' }))
  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[10,0.1,10]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  )
}

export default function Plinko() {
  const pegs = []
  for (let y=4; y>0; y-=1) {
    for (let x=-y; x<=y; x+=2) {
      pegs.push([x*0.5, y, 0])
    }
  }
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }} style={{height: '100vh'}}>
      <ambientLight intensity={0.5} />
      <spotLight position={[5,10,5]} angle={0.3} penumbra={1} castShadow />
      <Suspense fallback={null}>
        <Physics>
          <Floor />
          {pegs.map((p, i) => <Peg key={i} position={p} />)}
          <Ball />
        </Physics>
      </Suspense>
    </Canvas>
  )
}
