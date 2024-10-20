import React from 'react'
import { getBezierPath } from 'reactflow'
import { MdCancel } from 'react-icons/md'
import { useGlobalChatbotBuilderContext } from '../../contexts/ChatbotBuilderContext'

const foreignObjectSize = 40

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { edges, setEdges } = useGlobalChatbotBuilderContext()
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation()
    const edgesAfterDelete = edges.filter((edge) => edge.id != id)
    setEdges(edgesAfterDelete)
  }

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml">
        <div>
          <button
            className={`bg-[#5784f7] rounded-full`}
            onClick={(event) => onEdgeClick(event, id)}>
            <MdCancel style={{ color: 'white' }} />
          </button>
        </div>
      </foreignObject>
    </>
  )
}
