<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function loadEmployees()
    {
        $employees = Employee::with(['gender'])
            ->where('tbl_employees.is_deleted', false)
            ->get();

        return response()->json([
            'employees' => $employees
        ], 200);
    }
    public function storeEmployee(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'suffix_name' => ['nullable'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required'],
            'address' => ['required'],
            'contact_number' => ['required'],
            'role' => ['required', Rule::in(['admin', 'manager', 'cashier'])],
            'email' => [
                'required',
                'email',
                Rule::unique('tbl_employees', 'email')
            ],
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'max:15'
            ],
            'password_confirmation' => [
                'required',
                'min:8',
                'max:15'
            ],
        ]);

        $age = date_diff(date_create($validated['birth_date']), date_create('now'))->y;

        Employee::create([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name'],
            'suffix_name' => $validated['suffix_name'],
            'age' => $age,
            'birth_date' => $validated['birth_date'],
            'gender_id' => $validated['gender'],
            'address' => $validated['address'],
            'contact_number' => $validated['contact_number'],
            'role' => $validated['role'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password'])
        ]);

        return response()->json([
            'message' => 'Employee created successfully added.'
        ], 200);
    }

    public function updateEmployee(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'suffix_name' => ['nullable'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required'],
            'address' => ['required'],
            'contact_number' => ['required'],
            'role' => ['required', Rule::in(['admin', 'manager', 'cashier'])],
            'email' => [
                'required',
                'email',
                Rule::unique('tbl_employees', 'email')->ignore($employee)
            ],
        ]);

        $age = date_diff(date_create($validated['birth_date']), date_create('now'))->y;

        $employee->update([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name'],
            'suffix_name' => $validated['suffix_name'],
            'age' => $age,
            'birth_date' => $validated['birth_date'],
            'gender_id' => $validated['gender'],
            'address' => $validated['address'],
            'contact_number' => $validated['contact_number'],
            'role' => $validated['role'],
            'email' => $validated['email'],
        ]);

        return response()->json([
            'message' => 'Employee Successfully Updated.'
        ], 200);
    }

    public function destroyEmployee(Employee $employee)
    {
        $employee->update([
            'is_deleted' => true
        ]);
        return response()->json([
            'message' => 'Employee Successfully Deleted.'
        ], 200);
    }
}
