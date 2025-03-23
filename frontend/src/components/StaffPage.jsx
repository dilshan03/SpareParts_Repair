import React from 'react';

const staffMembers = [
  {
    name: 'John Doe',
    position: 'Manager',
    experience: '15+ years in automotive management',
    specialty: 'Customer service & business operations',
    certification: 'Certified Automotive Service Manager',
    photo: '/images/john_doe.jpg',
    department: 'Management',
  },
  {
    name: 'Jane Smith',
    position: 'Lead Mechanic',
    experience: '10+ years in vehicle repair',
    specialty: 'Engine diagnostics & brake systems',
    certification: 'ASE Certified Technician',
    photo: '/images/jane_smith.jpg',
    department: 'Mechanics',
  },
  {
    name: 'Mike Johnson',
    position: 'Sales Representative',
    experience: '5+ years in automotive sales',
    specialty: 'Spare parts & customer support',
    certification: 'Certified Auto Parts Specialist',
    photo: '/images/mike_johnson.jpg',
    department: 'Sales',
  },
];

const StaffPage = () => {
  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
        Meet Our Staff
      </h1>
      <p style={{ textAlign: 'center', color: 'gray', marginBottom: '20px' }}>
        Our team of experts is here to help with all your vehicle needs.
      </p>

      {/* Staff Members Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {staffMembers.map((member, index) => (
          <div key={index} style={{ background: 'white', padding: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'center' }}>
            <img
              src={member.photo}
              alt={member.name}
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <h3 style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{member.name}</h3>
            <p style={{ color: 'gray', fontWeight: 'bold' }}>{member.position}</p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{member.experience}</p>
            <p style={{ fontSize: '0.9rem', color: 'green', fontWeight: 'bold' }}>{member.specialty}</p>
            <p style={{ fontSize: '0.9rem', color: 'blue' }}>{member.certification}</p>
          </div>
        ))}
      </div>

      {/* Staff Login Button in the Right Corner */}
      <a 
        href="/login" 
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          backgroundColor: 'green',
          color: 'white',
          padding: '12px 20px',
          textAlign: 'center',
          fontWeight: 'bold',
          borderRadius: '5px',
          textDecoration: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        Staff Login
      </a>
    </div>
  );
};

export default StaffPage;
