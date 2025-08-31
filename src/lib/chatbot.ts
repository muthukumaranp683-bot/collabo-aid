import { mockCurrentUser, mockAttendance, mockMarks, mockFees, mockLeaveRequests, mockEvents } from './mock-data';
import { ChatMessage } from '@/types';

export class Chatbot {
  private generateResponse(query: string): string {
    const lowercaseQuery = query.toLowerCase();

    // Attendance queries
    if (lowercaseQuery.includes('attendance')) {
      const totalClasses = 120;
      const attendedClasses = Math.round((mockCurrentUser.attendancePercentage / 100) * totalClasses);
      const missedClasses = totalClasses - attendedClasses;
      
      return `Hi ${mockCurrentUser.name}! 📊

Your current attendance details:
• Attendance Percentage: ${mockCurrentUser.attendancePercentage}%
• Classes Attended: ${attendedClasses} out of ${totalClasses}
• Classes Missed: ${missedClasses}

${mockCurrentUser.attendancePercentage < 75 ? 
  '⚠️ Warning: Your attendance is below 75%. You may not be eligible for exams.' : 
  '✅ Great! Your attendance is above the required 75%.'}`;
    }

    // Marks queries
    if (lowercaseQuery.includes('marks') || lowercaseQuery.includes('result') || lowercaseQuery.includes('grades')) {
      const internalMarks = mockMarks.filter(m => m.studentId === mockCurrentUser.id && m.type === 'internal');
      const externalMarks = mockMarks.filter(m => m.studentId === mockCurrentUser.id && m.type === 'external');
      
      let response = `📚 Your Academic Performance:\n\n`;
      
      if (internalMarks.length > 0) {
        response += `Internal Marks:\n`;
        internalMarks.forEach(mark => {
          response += `• ${mark.subject}: ${mark.marks}/${mark.totalMarks} (${Math.round((mark.marks/mark.totalMarks)*100)}%)\n`;
        });
        response += `\n`;
      }
      
      if (externalMarks.length > 0) {
        response += `External Marks:\n`;
        externalMarks.forEach(mark => {
          response += `• ${mark.subject}: ${mark.marks}/${mark.totalMarks} (${Math.round((mark.marks/mark.totalMarks)*100)}%)\n`;
        });
      }
      
      return response || 'No marks available yet. Please check back after your exams.';
    }

    // Fee queries
    if (lowercaseQuery.includes('fee') || lowercaseQuery.includes('payment')) {
      const studentFees = mockFees.filter(f => f.studentId === mockCurrentUser.id);
      
      if (studentFees.length === 0) {
        return 'No fee records found.';
      }
      
      let response = `💰 Your Fee Details:\n\n`;
      studentFees.forEach(fee => {
        const status = fee.status === 'paid' ? '✅ Paid' : '❌ Unpaid';
        response += `• ${fee.description}: ₹${fee.amount.toLocaleString()}\n`;
        response += `  Status: ${status}\n`;
        response += `  Due Date: ${new Date(fee.dueDate).toLocaleDateString()}\n\n`;
      });
      
      return response;
    }

    // Leave queries
    if (lowercaseQuery.includes('leave') && !lowercaseQuery.includes('apply')) {
      const userLeaves = mockLeaveRequests.filter(l => l.studentId === mockCurrentUser.id);
      
      let response = `🏥 Your Leave Information:\n\n`;
      response += `Sick Leaves Used: ${mockCurrentUser.sickLeavesUsed}/2 per month\n`;
      response += `Casual Leaves Used: ${mockCurrentUser.casualLeavesUsed}/2 per month\n\n`;
      
      if (userLeaves.length > 0) {
        response += `Recent Leave Requests:\n`;
        userLeaves.slice(0, 3).forEach(leave => {
          const statusEmoji = leave.status === 'approved' ? '✅' : leave.status === 'rejected' ? '❌' : '⏳';
          response += `• ${leave.type.toUpperCase()}: ${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()} ${statusEmoji}\n`;
        });
      }
      
      return response;
    }

    // Apply for leave
    if (lowercaseQuery.includes('apply') && lowercaseQuery.includes('leave')) {
      return `📝 To apply for leave, please provide the following information:

1. Type of leave (Sick/Casual)
2. Start date
3. End date  
4. Reason for leave

Leave Rules:
• Maximum 2 sick leaves per month
• Medical certificate required for sick leave > 3 days
• Casual leaves subject to approval
• Weekends (Sat-Sun) are fixed holidays

Please contact the admin office or use the leave application form in your dashboard.`;
    }

    // Events queries
    if (lowercaseQuery.includes('event') || lowercaseQuery.includes('holiday') || lowercaseQuery.includes('exam')) {
      const upcomingEvents = mockEvents
        .filter(e => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5);
      
      if (upcomingEvents.length === 0) {
        return 'No upcoming events scheduled.';
      }
      
      let response = `📅 Upcoming Events:\n\n`;
      upcomingEvents.forEach(event => {
        const icon = event.type === 'exam' ? '📝' : event.type === 'holiday' ? '🎉' : '🎊';
        response += `${icon} ${event.title}\n`;
        response += `   Date: ${new Date(event.date).toLocaleDateString()}\n`;
        response += `   ${event.description}\n\n`;
      });
      
      return response;
    }

    // Help or general queries
    if (lowercaseQuery.includes('help') || lowercaseQuery.includes('what can you do')) {
      return `👋 Hello ${mockCurrentUser.name}! I'm your student assistant. I can help you with:

📊 **Attendance** - Check your attendance percentage and records
📚 **Marks & Results** - View your internal and external exam marks  
💰 **Fees** - Check fee status and payment details
🏥 **Leave Requests** - View leave balance and apply for leave
📅 **Events & Holidays** - Get upcoming events and holiday dates

Just ask me about any of these topics! For example:
• "What's my attendance?"
• "Show my marks"
• "Any upcoming events?"
• "How do I apply for leave?"`;
    }

    // Default response
    return `I didn't quite understand that. I can help you with:
• Attendance records
• Exam marks and results  
• Fee payments
• Leave applications
• Upcoming events

Try asking something like "What's my attendance?" or "Show my marks".`;
  }

  public async sendMessage(message: string): Promise<ChatMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = this.generateResponse(message);
    
    return {
      id: Date.now().toString(),
      message: response,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}

export const chatbot = new Chatbot();