import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { toast } from 'react-toastify';
import localClientService from '../../services/localClientService';
import './AppointmentsCalendar.css';

interface Appointment {
  id: number;
  title: string;
  start: string;
  end: string;
  customer: string;
  service: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const AppointmentsCalendar: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      // Mock data - replace with actual API call
      const mockAppointments: Appointment[] = [
        {
          id: 1,
          title: 'Tratamiento Facial Premium',
          start: '2024-03-20T10:00:00',
          end: '2024-03-20T11:30:00',
          customer: 'María González',
          service: 'Tratamiento Facial Premium',
          status: 'confirmed'
        },
        {
          id: 2,
          title: 'Depilación Láser',
          start: '2024-03-20T14:00:00',
          end: '2024-03-20T15:00:00',
          customer: 'Carlos Ramírez',
          service: 'Depilación Láser',
          status: 'pending'
        }
      ];
      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast.error('Error al cargar las citas');
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#1a73e8'; // Google Calendar blue
      case 'completed': return '#0b8043'; // Google Calendar green
      case 'cancelled': return '#d50000'; // Google Calendar red
      default: return '#f5b400'; // Google Calendar yellow
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale={esLocale}
        editable={false}
        selectable={false}
        selectMirror={false}
        dayMaxEvents={true}
        weekends={true}
        events={appointments.map(apt => ({
          id: apt.id.toString(),
          title: `${apt.customer} - ${apt.service}`,
          start: apt.start,
          end: apt.end,
          backgroundColor: getEventColor(apt.status),
          borderColor: getEventColor(apt.status),
          classNames: ['calendar-event'],
          extendedProps: {
            status: apt.status
          }
        }))}
        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
        slotDuration="00:30:00"
        height="100%"
        eventContent={(eventInfo) => (
          <div className="event-content">
            <div className="event-title">{eventInfo.event.title}</div>
            <div className="event-time">
              {new Date(eventInfo.event.start!).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
              {' - '}
              {new Date(eventInfo.event.end!).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        )}
        nowIndicator={true}
        scrollTime="07:00:00"
        businessHours={{
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          startTime: '07:00',
          endTime: '21:00',
        }}
      />
    </div>
  );
};

export default AppointmentsCalendar; 