import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // State for managing the list and editing
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const defaultFormState = {
    title: '', category: 'Baking', image: '', description: '',
    hasTiers: false, basicPrice: '', basicItems: '', advancedPrice: '', advancedItems: ''
  };
  const [formData, setFormData] = useState(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all courses when authenticated
  useEffect(() => {
    if (isAuthenticated) fetchCourses();
  }, [isAuthenticated]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'rasoi2026') setIsAuthenticated(true);
    else { alert('Incorrect password.'); setPasswordInput(''); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEditClick = (course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      category: course.category,
      image: course.image,
      description: course.description,
      hasTiers: course.hasTiers,
      basicPrice: course.basic?.price || '',
      basicItems: course.basic?.items?.join(', ') || '',
      advancedPrice: course.advanced?.price || '',
      advancedItems: course.advanced?.items?.join(', ') || ''
    });
    window.scrollTo(0, 0); 
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this course?")) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Course deleted.');
        fetchCourses(); 
        if (editingId === id) cancelEdit(); 
      } else alert('Failed to delete.');
    } catch (error) {
      alert('Server error.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(defaultFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      category: formData.category,
      image: formData.image,
      description: formData.description,
      hasTiers: formData.hasTiers,
      basic: {
        price: formData.basicPrice,
        items: formData.basicItems.split(',').map(i => i.trim()).filter(i => i !== '')
      },
      advanced: formData.hasTiers ? {
        price: formData.advancedPrice,
        items: formData.advancedItems.split(',').map(i => i.trim()).filter(i => i !== '')
      } : undefined
    };

    // --- FIXED: Updated the URL logic to use the environment variable ---
    const url = editingId 
      ? `${import.meta.env.VITE_API_URL}/api/courses/${editingId}` 
      : `${import.meta.env.VITE_API_URL}/api/courses`;
    const method = editingId ? 'PUT' : 'POST';

    if (!editingId) {
       payload.id = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(`Course successfully ${editingId ? 'updated' : 'added'}!`);
        cancelEdit();
        fetchCourses(); 
      } else alert('Failed to save course.');
    } catch (error) {
      alert('Cannot connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (  
      <div className="admin-page login-mode">
        <div className="login-card">
          <h2>Admin Access</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Enter Password" autoFocus />
            <button type="submit" className="cta-button full-width">Unlock</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Admin Control Center</h2>
        <button className="logout-button" onClick={() => setIsAuthenticated(false)}>Lock Dashboard</button>
      </div>

      <div className="admin-content-wrapper">
        <div className="admin-form-container">
          <h3>{editingId ? 'Edit Course' : 'Add New Course'}</h3>
          {editingId && <button className="cancel-edit-btn" onClick={cancelEdit}>Cancel Edit</button>}
          
          <form onSubmit={handleSubmit} className="admin-form">
             <div className="form-section">
                <div className="input-group">
                  <label>Course Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                      <option value="Baking">Baking</option>
                      <option value="Cooking">Cooking</option>
                      <option value="Workshops">Workshops</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Image URL</label>
                    <input type="url" name="image" value={formData.image} onChange={handleChange} required />
                  </div>
                </div>
                <div className="input-group">
                  <label>Course Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"></textarea>
                </div>
             </div>

             <div className="form-section">
                <div className="tier-header">
                  <h4>Pricing & Curriculum</h4>
                  <label className="checkbox-label">
                    <input type="checkbox" name="hasTiers" checked={formData.hasTiers} onChange={handleChange} /> Enable Advanced Tier?
                  </label>
                </div>

                <div className="tier-box">
                  <div className="input-group">
                    <label>Basic Price</label>
                    <input type="text" name="basicPrice" value={formData.basicPrice} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Basic Items (Comma separated)</label>
                    <textarea name="basicItems" value={formData.basicItems} onChange={handleChange} required rows="2"></textarea>
                  </div>
                </div>

                {formData.hasTiers && (
                  <div className="tier-box advanced-box">
                    <div className="input-group">
                      <label>Advanced Price</label>
                      <input type="text" name="advancedPrice" value={formData.advancedPrice} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                      <label>Advanced Items (Comma separated)</label>
                      <textarea name="advancedItems" value={formData.advancedItems} onChange={handleChange} required rows="2"></textarea>
                    </div>
                  </div>
                )}
             </div>

            <button type="submit" className="cta-button full-width" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Course' : 'Publish Course')}
            </button>
          </form>
        </div>

        <div className="admin-list-container">
          <h3>Current Courses</h3>
          <div className="course-list">
            {courses.map(course => (
              <div key={course.id} className="admin-course-card">
                <img src={course.image} alt={course.title} className="admin-course-thumb" />
                <div className="admin-course-info">
                  <h4>{course.title}</h4>
                  <span className="admin-badge">{course.category}</span>
                </div>
                <div className="admin-course-actions">
                  <button className="edit-btn" onClick={() => handleEditClick(course)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteClick(course.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;