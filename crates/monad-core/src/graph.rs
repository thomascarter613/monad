//! Ecosystem graph system for Monad.
//!
//! This module will contain the 

pub mod model;
pub mod node;
pub mod edge;
pub mod node_kind;
pub mod edge_kind;
pub mod builder;
pub mod workspace_graph;
pub mod task_graph;
pub mod dependency_graph;
pub mod provenance_graph;
pub mod ordering;
pub mod render;
pub mod render_text;
pub mod render_json;
pub mod render_mermaid;
pub mod render_dot;
pub mod diagnostics;