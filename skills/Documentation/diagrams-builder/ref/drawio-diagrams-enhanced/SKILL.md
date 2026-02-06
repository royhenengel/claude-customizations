---
name: drawio-diagrams-enhanced
description: Create professional draw.io (diagrams.net) diagrams in XML format (.drawio files) with integrated PMP/PMBOK methodologies, extensive visual asset libraries, and industry-standard professional templates. Use this skill when users ask to create flowcharts, swimlane diagrams, cross-functional flowcharts, org charts, network diagrams, UML diagrams, BPMN, project management diagrams (WBS, Gantt, PERT, RACI), risk matrices, stakeholder maps, or any other visual diagram in draw.io format.
allowed-tools: Write, Edit, Read
---

# Enhanced Draw.io Diagram Creation Skill

This skill enables creation of professional, pixel-perfect diagrams in draw.io's native XML format with enterprise-grade capabilities including project management methodologies, extensive icon libraries, and industry-standard templates.

## Core Capabilities

### 1. Standard Diagram Types
- Flowcharts: Basic flowcharts, decision trees, process flows
- Cross-Functional Flowcharts (CFF): Swimlane diagrams showing processes across departments/roles
- BPMN Diagrams: Business Process Model and Notation diagrams
- UML Diagrams: Class diagrams, sequence diagrams, use case diagrams
- Network Diagrams: Infrastructure, cloud architecture, system design
- Org Charts: Organizational hierarchies and team structures
- Mind Maps: Conceptual mapping and brainstorming
- Entity Relationship Diagrams: Database schemas

### 2. PMP/PMBOK Project Management Diagrams
- Work Breakdown Structure (WBS): Hierarchical decomposition of project deliverables
- Project Network Diagrams: PERT charts, CPM, activity dependencies
- Gantt Charts: Timeline-based project schedules
- RACI Matrices: Responsibility assignment matrices
- Risk Register Diagrams: Risk matrices, heat maps, probability-impact grids
- Stakeholder Maps: Power-interest grids, influence diagrams
- Resource Histograms: Resource allocation and capacity planning
- Communication Plans: Information flow diagrams
- Process Group Diagrams: Initiating, Planning, Executing, Monitoring & Controlling, Closing
- Knowledge Area Maps: Integration, Scope, Schedule, Cost, Quality, Resource, Communications, Risk, Procurement, Stakeholder Management

### 3. Visual Asset Libraries Available

**Icon & Symbol Libraries**:
- Material Design Icons
- Font Awesome icons
- OSA (Open Security Architecture) Icons
- UN-OCHA Humanitarian Icons
- Flat Color Icons
- Chart & Infographic Icons

**Technology & Infrastructure**:
- Kubernetes Icons
- Cloud Provider Icons (AWS, Azure, GCP, DigitalOcean)
- Network Device Libraries (Cisco, Arista, Fortinet)
- DevOps & CI/CD Pipeline Shapes

**Business & General Purpose**:
- Wireframe Components
- Avatars & People Icons
- Form Elements

## Draw.io File Format

Draw.io files are XML-based with the `.drawio` extension. Basic structure:

```xml
<mxfile host="app.diagrams.net" modified="[timestamp]" agent="Claude" version="24.7.17">
  <diagram id="[unique-id]" name="Page-1">
    <mxGraphModel dx="1434" dy="759" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- Shapes and connectors go here -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## Core Concepts

### 1. Cells (mxCell)
Everything in draw.io is a cell - shapes, connectors, containers, and root elements.

**Basic Shape Cell:**
```xml
<mxCell id="2" value="Process Step" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="120" height="60" as="geometry"/>
</mxCell>
```

**Connector Cell:**
```xml
<mxCell id="3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="2" target="4">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

### 2. ID Management
- Each cell must have a unique ID
- Use sequential integers: "2", "3", "4", etc.
- IDs "0" and "1" are reserved for root cells

### 3. Styling
Styles are semicolon-separated key-value pairs:
- **Shape type**: `rounded=1`, `ellipse`, `rhombus`
- **Colors**: `fillColor=#dae8fc`, `strokeColor=#6c8ebf`, `fontColor=#000000`
- **Text**: `fontSize=12`, `fontStyle=1` (bold=1, italic=2, underline=4)
- **Alignment**: `align=center`, `verticalAlign=middle`

## Common Shape Styles

### Flowchart Shapes

**Process (Rectangle):**
```
rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;
```

**Decision (Diamond):**
```
rhombus;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;
```

**Start/End (Ellipse):**
```
ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;
```

**Document:**
```
shape=document;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;
```

### Swimlane Shapes

**Swimlane Container:**
```
swimlane;html=1;startSize=20;fillColor=#f5f5f5;strokeColor=#666666;fontStyle=1;
```

## Color Schemes

### Professional Blue Theme
- **Primary**: `fillColor=#dae8fc;strokeColor=#6c8ebf;`
- **Secondary**: `fillColor=#b1ddf0;strokeColor=#10739e;`
- **Accent**: `fillColor=#f8cecc;strokeColor=#b85450;`

### Green/Natural Theme
- **Primary**: `fillColor=#d5e8d4;strokeColor=#82b366;`
- **Secondary**: `fillColor=#fff2cc;strokeColor=#d6b656;`
- **Accent**: `fillColor=#e1d5e7;strokeColor=#9673a6;`

### PMP Risk Matrix Colors
- **Critical**: `fillColor=#8B0000;strokeColor=#600000;fontColor=#ffffff;`
- **High**: `fillColor=#FF0000;strokeColor=#CC0000;fontColor=#ffffff;`
- **Medium**: `fillColor=#FFA500;strokeColor=#CC8400;fontColor=#000000;`
- **Low**: `fillColor=#FFFF00;strokeColor=#CCCC00;fontColor=#000000;`
- **Very Low**: `fillColor=#90EE90;strokeColor=#66AA66;fontColor=#000000;`

## PMBOK Process Groups & Knowledge Areas

### 5 Process Groups (Color Coding)
1. **Initiating**: Green (`#d5e8d4`)
2. **Planning**: Blue (`#dae8fc`)
3. **Executing**: Orange (`#ffe6cc`)
4. **Monitoring & Controlling**: Yellow (`#fff2cc`)
5. **Closing**: Purple (`#e1d5e7`)

### 10 Knowledge Areas
1. Integration Management - Gray
2. Scope Management - Blue
3. Schedule Management - Green
4. Cost Management - Orange
5. Quality Management - Red
6. Resource Management - Purple
7. Communications Management - Teal
8. Risk Management - Yellow
9. Procurement Management - Pink
10. Stakeholder Management - Light Purple

## Connector Styles

### Basic Connector
```
edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;
```

### With Arrow
```
edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;endArrow=classic;endFill=1;
```

### Dashed Line
```
edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;dashPattern=5 5;
```

### Critical Path (Thick)
```
edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=3;strokeColor=#b85450;
```

## Best Practices

### Layout Guidelines
- **Grid alignment**: Use x/y coordinates in multiples of 10
- **Standard spacing**: 20-30px between shapes, 40-50px between rows
- **Shape sizes**: Small: 80x40, Medium: 120x60, Large: 160x80

### Visual Hierarchy
- **Start shapes**: Green/light colors
- **End shapes**: Red/dark colors
- **Decision points**: Orange/yellow
- **Regular processes**: Blue/neutral
- **Critical path**: Red with thick borders (strokeWidth=3)

### Validation Checklist
- [ ] All IDs are unique
- [ ] Root cells (0, 1) exist
- [ ] All connectors have valid source/target
- [ ] Coordinates are positive numbers
- [ ] Style strings are properly formatted
- [ ] XML is well-formed

## Custom Library Integration

To open diagrams with specific icon libraries:

```
https://app.diagrams.net/?clibs=Uhttps://jgraph.github.io/drawio-libs/libs/templates.xml
```

Or in draw.io: File → Open Library from → URL

## Resources

- Official draw.io documentation: https://www.drawio.com/doc/
- Example diagrams: https://www.drawio.com/example-diagrams
- Custom libraries repository: https://github.com/jgraph/drawio-libs
- PMBOK Guide: https://www.pmi.org/
