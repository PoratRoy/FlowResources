erDiagram
    projects ||--o{ project_categories : has
    projects ||--o{ websites : has
    categories ||--o{ project_categories : belongs_to
    categories ||--o{ websites : has
    
    projects {
        uuid id PK
        text title
        timestamptz created_at
    }
    
    categories {
        uuid id PK
        text title
        timestamptz created_at
    }
    
    project_categories {
        uuid id PK
        uuid project_id FK
        uuid category_id FK
    }
    
    websites {
        uuid id PK
        uuid project_id FK
        uuid category_id FK
        text title
        text description
        text url
        text image
        timestamptz created_at
    }