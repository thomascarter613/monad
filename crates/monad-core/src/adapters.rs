//! Ecosystem adapter system for Monad.
//!
//! This module will contain the shared adapter traits, adapter capability
//! model, adapter registry, and concrete adapters such as Rust/Cargo and Bun.

pub mod capability;
pub mod registry;
pub mod rust;
pub mod bun;

pub mod command;
pub mod context;
pub mod detection;
pub mod diagnostic;
pub mod go;
pub mod python;
pub mod result;
pub mod traits;