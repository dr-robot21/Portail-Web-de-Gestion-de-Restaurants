<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    /**
     * GET /api/notifications
     */
    public function index(Request $request)
    {
        $user = auth('api')->user();
        $perPage = $request->get('per_page', 20);

        $notifications = Notification::where('user_id', $user->id)
            ->latest()
            ->paginate($perPage);

        $unreadCount = Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount,
        ]);
    }

    /**
     * PUT /api/notifications/{id}/read
     */
    public function markRead(int $id)
    {
        $user = auth('api')->user();
        $notification = Notification::where('user_id', $user->id)->findOrFail($id);
        $notification->update(['is_read' => true]);

        return response()->json($notification);
    }

    /**
     * PUT /api/notifications/mark-all-read
     */
    public function markAllRead()
    {
        $user = auth('api')->user();
        Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'All notifications marked as read.']);
    }

    /**
     * DELETE /api/notifications/{id}
     */
    public function destroy(int $id)
    {
        $user = auth('api')->user();
        $notification = Notification::where('user_id', $user->id)->findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted.']);
    }
}
